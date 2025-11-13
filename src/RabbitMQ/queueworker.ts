import { Channel, ChannelModel, Connection } from "amqplib";
import TimeUtils from "./utility/timeutils";

class RabbitQueueWorker {
  constructor(
    private readonly channel: Channel,
    private readonly connection: ChannelModel
  ) {}
  async simpleMQMessageSender(queue: string, payload: string): Promise<void> {
    await this.channel.assertQueue(queue, { durable: false });
    this.channel.sendToQueue(queue, Buffer.from(payload));
    console.log(`Message is sent from queue:${queue}: ${payload}`);
  }
  async simpleMessageReciver(queue: string): Promise<void> {
    await this.channel.assertQueue(queue, { durable: false });
    const result = await this.channel.consume(
      queue,
      (msg) => {
        if (!msg) return null;
        const content = msg?.content.toString();
        console.log("This is the message recieved from reviever", content);
        this.channel.ack(msg);
        return content;
      },
      { noAck: false }
    );
  }

  // worker example
  async workerMQMessageSender() {
    const queue = "task_queue";
    const message = "Hello_World...";
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.sendToQueue(queue, Buffer.from(message));
    console.log("Worker sender sent his message");
  }

  async workerMQMessageReciever() {
    const queue = "task_queue";

    this.channel.consume(
      queue,
      (msg) => {
        if (!msg) return;

        var secs = msg.content.toString().split(".").length - 1;

        console.log(" [x] Received %s", msg.content.toString());
        setTimeout(function () {
          console.log(" [x] Done");
        }, secs * 1000);
      },
      {
        noAck: true,
      }
    );
  }

  // multiple message publishing

  async workerSenderSendsMultipleMessage() {
    const queue = "task_queue_multiple";
    const message = "Hello_World...";

    await this.channel.assertQueue(queue, { durable: true });

    for (let i = 1; i <= 5; i++) {
      const dynamicMessage = `Message Number: ${i}`;
      this.channel.sendToQueue(queue, Buffer.from(dynamicMessage));
      console.log(`Message ${i} is sent`);
      // sleep for one sec
      await TimeUtils.sleep(1000);
    }
    console.log("All messages are sent!");
  }

  async workerRecieverWaitsForMultipleMessages(workerID: number) {
    const queue = "task_queue_multiple";

    await this.channel.assertQueue(queue, { durable: true });

    this.channel.consume(
      queue,
      (msg) => {
        if (!msg) return;
        console.log(`Worker ${workerID} recieved`, msg.content.toString());
      },
      {
        noAck: true,
      }
    );
  }

  async heavyWorkSenderProduceOnOddNumbers() {
    const queue = "heavy_task_on_odd_number";

    await this.channel.assertQueue(queue, { durable: true });
    for (let i = 1; i <= 5; i++) {
      const dynamicMessage = {
        work_id: i,
        message: `This work has been completed. Work id is ${i}`,
      };
      this.channel.sendToQueue(
        queue,
        Buffer.from(JSON.stringify(dynamicMessage)),
        { persistent: true }
      );
      // console.log(`Work ${i} is sent by producer`);

      await TimeUtils.sleep(1000);
    }
  }

  async heavyWorkRecieverAccepting(workerId: number) {
    // so in order to imitate heavy work we create settimeout if work id iss odd
    const queue = "heavy_task_on_odd_number";

    await this.channel.assertQueue(queue, { durable: true });
    // prefetch allows fair share among workers
    this.channel.prefetch(1);
    this.channel.consume(
      queue,
      (msg) => {
        if (!msg) return;
        const oncomingMessage = JSON.parse(msg.content.toString()) as {
          work_id: number;
          message: string;
        };

        const { work_id, message } = oncomingMessage;

        // if it is an odd number
        if (work_id % 2 !== 0) {
          setTimeout(() => {
            console.log(
              `Slow work ${work_id} is completed by Worker:${workerId}`
            );
            this.channel.ack(msg);
          }, 5000);
        } else {
          console.log(
            `Fast work ${work_id} is completed by Worker:${workerId}`
          );
          this.channel.ack(msg);
        }
      },
      { noAck: false }
    );
  }
  async exchangePublisher() {
    const exchange = "logs";
    const msg = "TM1 Server is crashed";

    await this.channel.assertExchange(exchange, "fanout", { durable: false });

    this.channel.publish(exchange, "", Buffer.from(msg));
    console.log("Publisher sent the message", msg);

    setTimeout(() => {
      this.connection.close();
      console.log("Connection is closed");
    }, 1000);
  }
  async exchangeListener(listenerID: number) {
    const exchange = "logs";

    await this.channel.assertExchange(exchange, "fanout", { durable: false });
    const resultAssertQueue = await this.channel.assertQueue("", {
      exclusive: true,
    });

    console.log(
      `[*] lISTENER ${listenerID} Waiting for messages in %s. To exit press CTRL+C`,
      resultAssertQueue.queue
    );

    this.channel.bindQueue(resultAssertQueue.queue, exchange, "");

    this.channel.consume(
      resultAssertQueue.queue,
      (msg) => {
        if (!msg) return;
        if (msg.content) {
          console.log(
            `Listener ${listenerID} recieved this;`,
            msg.content.toString()
          );
        }
      },
      {
        noAck: true,
      }
    );
  }

  async fanOutExchangeForLogPublisher() {
    // consumer side
    // step-1 assertand exchange
    await this.channel.assertExchange("log", "fanout", { durable: false });
    // step-2 send a message to exchange
    // second empty argument means we sending this to evert queue in that particular exchange in order to achieve broadcasting functionality
    this.channel.publish(
      "log",
      "",
      Buffer.from("There is an important log in here")
    );
    // no more step from publisher side as publisher only responsible to send message to exchange , exchange responsible send message to queue
  }
  async fanOutExchangeForLogReceiver(listenerId: number) {
    // listener side
    //step.1 create a queue
    // Passing "" tells RabbitMQ “give me a fresh, unique queue name.”
    const { queue } = await this.channel.assertQueue("", { exclusive: true });
    // step-2 bind the queue to exchanger
    // This tells RabbitMQ “deliver anything from logs into my queue.” Fanout ignores the routing key, so "" or any string behaves the same.
    await this.channel.bindQueue(queue, "log", "");

    // step.3 start to consume
    const { consumerTag } = await this.channel.consume(
      queue,
      (msg) => {
        if (!msg) return;
        console.log(
          `Consumer:${listenerId} catched this message; ${msg.content.toString()}`
        );
      },
      { noAck: true }
    );

    // you can also use following methods to perform some actions

    //   await channel.cancel(consumerTag);    // stops listener
    //   await channel.deleteQueue(queue);     // optional, remove queue
    //   await channel.close();                // optional, close channel
  }
}

export default RabbitQueueWorker;

//   Fanout Flow, Step by Step

// Publisher: declare the exchange
// await channel.assertExchange("logs", "fanout", { durable: false });
// Exchanges don’t store messages; they route. You must make sure the exchange exists before publishing.

// Publisher: send the message
// channel.publish("logs", "", Buffer.from("hello"));
// In fanout mode the routing key is ignored, so "" is fine. RabbitMQ copies the message to every queue bound to logs.

// Consumer: create a queue
// const { queue } = await channel.assertQueue("", { exclusive: true });
// Passing "" tells RabbitMQ “give me a fresh, unique queue name.” It creates something like amq.gen-JzTY20BRgKO-HjmUJj0wLg that:

// is private to this connection (exclusive: true)
// auto-deletes when the connection closes
// Each listener gets its own queue so everyone receives every broadcast copy. If you supplied a name (e.g., "logs_queue"), every listener would share that single queue, and RabbitMQ would round-robin messages between them—no longer a broadcast.
// Consumer: bind queue to exchange
// await channel.bindQueue(queue, "logs", "");
// This tells RabbitMQ “deliver anything from logs into my queue.” Fanout ignores the routing key, so "" or any string behaves the same.

// Consumer: start consuming
// channel.consume(queue, (msg) => console.log(msg?.content.toString()), { noAck: true });
// Each listener reads from its own auto-generated queue and gets every message.

// What if assertQueue used a name?

// assertQueue("listenerA", { exclusive: true }) would create a fixed queue named listenerA. If multiple consumers tried to declare the same exclusive queue, only the first would succeed; others would error.
// assertQueue("shared", { exclusive: false }) would let multiple consumers attach, but they would compete: each message goes to only one consumer. That’s useful for work queues, not broadcasts.
// So the "" queue name plus exclusive: true is the pattern that makes fanout behave like pub/sub: every listener gets its own temporary queue, and binding that queue to the exchange is what routes the messages there.

//   Direct Exchange (exact routing keys)

// Publisher declares the exchange
// await channel.assertExchange("direct_logs", "direct", { durable: false });
// Direct exchanges deliver a message only to queues whose binding key exactly matches the message’s routing key.

// Publisher sends with a routing key
// channel.publish("direct_logs", "error", Buffer.from("something broke"));
// The routing key ("error", "info", etc.) is the selector. If no queue is bound with that key, the message is dropped unless you set mandatory.

// Consumer declares/gets a queue
// await channel.assertQueue("errors_only", { durable: false });
// Here you deliberately use a fixed name—multiple consumers can share it if you want them to divide the workload; no need for "" because you want a specific bucket of messages.

// Consumer binds queue with exact key
// await channel.bindQueue("errors_only", "direct_logs", "error");
// This says “deliver only messages where routingKey === 'error' into this queue.” You can bind multiple keys to the same queue if you want (bindQueue("errors_only", "direct_logs", "critical")).

// Consumer starts consuming
// channel.consume("errors_only", handler, { noAck: false });
// Only messages published with routing key "error" (or whichever keys you bound) arrive.

//   Headers Exchange (match on metadata instead of routing key)

// Publisher declares the exchange
// await channel.assertExchange("headers_logs", "headers", { durable: false });
// Headers exchanges ignore routing keys entirely and just look at message headers.

// Publisher sends with headers

// channel.publish(
//   "headers_logs",
//   "",
//   Buffer.from("pdf report"),
//   { headers: { format: "pdf", type: "report" } }
// );
// Whatever key/value pairs you attach go into the message header table.

// Consumer declares/gets a queue
// Often you still use an auto-generated queue for private subscribers:
// const { queue } = await channel.assertQueue("", { exclusive: true });
// But you could give it a name if you want multiple consumers sharing that header filter.

// Consumer binds queue with header arguments

// await channel.bindQueue(queue, "headers_logs", "", {
//   arguments: { format: "pdf", type: "report", "x-match": "all" },
// });
// x-match: "all" means every listed header must match; use "any" to match if at least one matches. Unlike fanout/direct/topic, the third argument (routing key) is ignored, so "" is fine.

// Consumer starts consuming
// channel.consume(queue, handler, { noAck: true });
// Only messages whose headers satisfy the binding arguments appear in this queue.

// So the key differences:

// Direct: queue name usually explicit; you bind with exact routing keys.
// Headers: binding uses arguments to describe header criteria; routing key is unused.
// The flow—assert exchange, assert queue, bind, consume—remains the same; you just change what you bind on.
