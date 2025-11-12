import amqp, { Channel, ChannelModel } from "amqplib";
import TimeUtils from "./utility/timeutils";

type RabbitContext = { connection: ChannelModel; channel: Channel };

interface RabbitMQInt {
  initializeRabbitMQ(): Promise<RabbitContext>;
  getRabbit(): RabbitContext;
}

class RabbitMQ implements RabbitMQInt {
  private readonly RABBIT_URL = "amqp://rabbitmq";
  private readonly MAX_RETRIES = 10;
  private readonly RETRY_DELAY_MS = 3000;

  private rabbitContext?: RabbitContext;
  private connectingPromise?: Promise<RabbitContext>;

  getRabbit(): RabbitContext {
    if (!this.rabbitContext) {
      throw new Error("RabbitMQ not initialized");
    }
    return this.rabbitContext;
  }

  async initializeRabbitMQ(): Promise<RabbitContext> {
    if (this.rabbitContext) return this.rabbitContext;
    if (this.connectingPromise) return this.connectingPromise;

    this.connectingPromise = (async () => {
      for (let attempt = 1; attempt <= this.MAX_RETRIES; attempt++) {
        try {
          return await this.openConnection();
        } catch (err) {
          const retriesLeft = this.MAX_RETRIES - attempt;
          console.warn(
            `RabbitMQ connection failed (${retriesLeft} retries left):`,
            err
          );
          if (attempt === this.MAX_RETRIES) throw err;
          await TimeUtils.sleep(this.RETRY_DELAY_MS);
        }
      }
      throw new Error("Failed to establish RabbitMQ connection");
    })();

    try {
      return await this.connectingPromise;
    } finally {
      this.connectingPromise = undefined;
    }
  }

  private async openConnection(): Promise<RabbitContext> {
    const connection = await amqp.connect(this.RABBIT_URL);
    connection.on("close", () => {
      console.warn("RabbitMQ connection closed");
      this.clearContext();
      void this.initializeRabbitMQ();
    });
    connection.on("error", (err) => {
      console.error("RabbitMQ connection error:", err);
    });

    const channel = await connection.createChannel();
    channel.on("close", () => {
      console.warn("RabbitMQ channel closed");
      this.clearContext();
      void this.initializeRabbitMQ();
    });
    channel.on("error", (err) => {
      console.error("RabbitMQ channel error:", err);
    });

    this.rabbitContext = { connection, channel };
    console.log("RabbitMQ successfully connected");
    return this.rabbitContext;
  }

  private clearContext(): void {
    this.rabbitContext = undefined;
    this.connectingPromise = undefined;
  }
}

const rabbitMQ = new RabbitMQ();
export default rabbitMQ;
