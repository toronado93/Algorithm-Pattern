import Fastify from "fastify";
import rabbitMQ from "./rabbitmq_con_class";
import RabbitQueueWorker from "./queueworker";

const app = Fastify({ logger: true });
const PORT = 3000;

const bootstrap = async () => {
  try {
    // rabbitmq initializtion
    await rabbitMQ.initializeRabbitMQ();

    // queue worker establishment
    const rabbitInfo = rabbitMQ.getRabbit();
    const queueWorker = new RabbitQueueWorker(rabbitInfo.channel);
    const queue = "QUEUE1";

    app.get("/", async () => ({ hello: "world" }));
    app.get("/createPublisher", async () => {
      const message = "Dalton brothers are crying";
      await queueWorker.simpleMQMessageSender(queue, message);
      return { message: "message is sent" };
    });
    app.get("/createReciver", async () => {
      queueWorker.simpleMessageReciver(queue);
      return { message: "message is recieved" };
    });

    // establish worker example
    app.get("/createWorkerP", async () => {
      queueWorker.workerMQMessageSender();
      return { message: "worker sender established" };
    });
    app.get("/createWorkerR", async () => {
      queueWorker.workerMQMessageReciever();
      return { message: "worker listener established" };
    });

    // multiple works
    app.get("/sequentialWorkPublisher", async () => {
      queueWorker.workerSenderSendsMultipleMessage();
      return { message: "Sequential Work fired" };
    });
    app.get("/sequentialWorkReceiverWorker1", async () => {
      queueWorker.workerRecieverWaitsForMultipleMessages(1);
      return { message: "Worker-1 established" };
    });
    app.get("/sequentialWorkReceiverWorker2", async () => {
      queueWorker.workerRecieverWaitsForMultipleMessages(2);
      return { message: "Worker-2 established" };
    });

    const address = await app.listen({ port: PORT, host: "0.0.0.0" });
    console.log(`Server up at ${address}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

void bootstrap();
