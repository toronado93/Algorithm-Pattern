import amqp, { Channel, ChannelModel } from "amqplib";

type RabbitContext = { connection: ChannelModel; channel: Channel };

const RABBIT_URL = "amqp://rabbitmq";
const MAX_RETRIES = 10;
const RETRY_DELAY_MS = 3000;

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

const initializeRabbitMQ = async (): Promise<RabbitContext> => {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const connection = await amqp.connect(RABBIT_URL);
      const channel = await connection.createChannel();
      console.log("RabbitMQ connection established");
      return { connection, channel };
    } catch (error) {
      console.log(
        `Error occured during rabbit connection , reattempt ${
          MAX_RETRIES - attempt
        }`
      );

      if (attempt === MAX_RETRIES) throw error;
      // sleep before try it again
      await sleep(RETRY_DELAY_MS);
    }
  }
  throw new Error("Failed to establish RabbitMQ connection");
};

let connectionPromise: Promise<RabbitContext> | undefined = undefined;

const connectRabbit = (): Promise<RabbitContext> => {
  if (!connectionPromise) {
    connectionPromise = initializeRabbitMQ(); // existing retry logic
  }
  return connectionPromise;
};

const getRabbit = (): Promise<RabbitContext> => {
  if (!connectionPromise) throw new Error("RabbitMQ not initialized");
  return connectionPromise;
};

export { connectRabbit, getRabbit };
