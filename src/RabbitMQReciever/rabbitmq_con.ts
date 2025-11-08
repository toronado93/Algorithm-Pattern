import amqp from "amqplib";

const RABBIT_URL = "amqp://rabbitmq";
const MAX_RETRIES = 10;
const RETRY_DELAY_MS = 3000;

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

const initializeRabbitMQ = async () => {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    let connection: amqp.Connection | undefined;
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
};

export default initializeRabbitMQ;
