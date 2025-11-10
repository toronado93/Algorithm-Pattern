import { Channel } from "amqplib";
import TimeUtils from "./utility/timeutils";

class RabbitQueueWorker {
  constructor(private readonly channel: Channel) {}
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
}

export default RabbitQueueWorker;
