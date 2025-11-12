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
}

export default RabbitQueueWorker;
