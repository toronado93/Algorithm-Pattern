import amqp, { Channel, ChannelModel } from "amqplib";
import TimeUtils from "./utility/timeutils";
type RabbitContext = { connection: ChannelModel; channel: Channel };

interface RabbitMQInt {
  initializeRabbitMQ(): Promise<RabbitContext>;
  getRabbit(): RabbitContext;
}

class RabbitMQ implements RabbitMQInt {
  private RABBIT_URL: string = "amqp://rabbitmq";
  private MAX_RETRIES: number = 10;
  private RETRY_DELAY_MS: number = 3000;
  private rabbitContex: RabbitContext | undefined;

  getRabbit(): RabbitContext {
    if (!this.rabbitContex) throw new Error("RabbitMQ not initialized");
    return this.rabbitContex;
  }
  async initializeRabbitMQ(): Promise<RabbitContext> {
    if (this.rabbitContex) return this.rabbitContex;
    for (let retry = 1; retry <= this.MAX_RETRIES; retry++) {
      const remain_retry = this.MAX_RETRIES - retry;
      try {
        const connection = await amqp.connect(this.RABBIT_URL);
        const channel = await connection.createChannel();
        this.rabbitContex = { connection, channel };
        console.log("RabbitMQ succesfully connected");
        return this.rabbitContex;
      } catch (error) {
        console.log(
          `RabbitMQ couldnt be established , will be retried ${remain_retry} times`
        );
        if (retry === this.MAX_RETRIES) throw error;
        await TimeUtils.sleep(this.RETRY_DELAY_MS);
      }
    }
    throw new Error("Failed to establish RabbitMQ connection");
  }
}

const rabbitMQ = new RabbitMQ();
export default rabbitMQ;
