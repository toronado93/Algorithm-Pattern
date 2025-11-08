import Fastify from "fastify";
import initializeRabbitMQ from "./rabbitmq_con";

const app = Fastify({ logger: true });
const PORT = 3000;

const bootstrap = async () => {
  try {
    const rabbitMQ = await initializeRabbitMQ(); // block here until connection + channel ready
    if (!rabbitMQ) throw new Error("No rabbitmq available");
    // message send attemps
    const queue = "QUEUE1";
    const message = "We are the world, we are the children!";

    // sender
    rabbitMQ.channel.assertQueue(queue, { durable: false });
    rabbitMQ.channel.sendToQueue(queue, Buffer.from(message));

    app.get("/", async () => ({ hello: "world" }));

    const address = await app.listen({ port: PORT, host: "0.0.0.0" });
    console.log(`Server up at ${address}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

void bootstrap();
