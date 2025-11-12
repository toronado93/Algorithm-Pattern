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
    const queueWorker = new RabbitQueueWorker(
      rabbitInfo.channel,
      rabbitInfo.connection
    );
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

    app.get("/heavyworkProducer", async () => {
      try {
        const { channel, connection } = rabbitMQ.getRabbit();
        const worker = new RabbitQueueWorker(channel, connection);
        await worker.heavyWorkSenderProduceOnOddNumbers();
        return { message: "Heavy work producer is initiated" };
      } catch (err) {
        app.log.error(err);
        await rabbitMQ.initializeRabbitMQ(); // ensure reconnection
        return { message: "Failed to publish heavy work" };
      }
    });

    app.get("/heavyworkReciever/1", async () => {
      const number = 1;

      try {
        const { channel, connection } = rabbitMQ.getRabbit();
        const worker = new RabbitQueueWorker(channel, connection);

        await worker.heavyWorkRecieverAccepting(number);

        return {
          message: `Heavy work consumer ${number} is established and ready to listen`,
        };
      } catch (error) {
        console.log("Error happened during channel connection", error);
        return {
          message: `Error happened during channel connection`,
        };
      }
    });

    app.get("/heavyworkReciever/2", async () => {
      const number = 2;

      try {
        const { channel, connection } = rabbitMQ.getRabbit();
        const worker = new RabbitQueueWorker(channel, connection);

        await worker.heavyWorkRecieverAccepting(number);
      } catch (error) {
        console.log("Error happened during channel connection", error);
      }

      return {
        message: `Heavy work consumer ${number} is established and ready to listen`,
      };
    });

    app.get("/exchangePublisher", async () => {
      const { channel, connection } = rabbitMQ.getRabbit();
      const worker = new RabbitQueueWorker(channel, connection);

      await worker.exchangePublisher();

      return { message: "Exchange Publisher" };
    });

    app.get("/exchangeReceiver/1", async () => {
      const { channel, connection } = rabbitMQ.getRabbit();
      const worker = new RabbitQueueWorker(channel, connection);

      await worker.exchangeListener(1);

      return { message: "Exchange Receiver-1" };
    });

    app.get("/exchangeReceiver/2", async () => {
      const { channel, connection } = rabbitMQ.getRabbit();
      const worker = new RabbitQueueWorker(channel, connection);

      await worker.exchangeListener(2);

      return { message: "Exchange Receiver-2" };
    });

    const address = await app.listen({ port: PORT, host: "0.0.0.0" });
    console.log(`Server up at ${address}`);
  } catch (err) {
    console.log("Error occured in server");
    app.log.error(err);
    process.exit(1);
  }
};

void bootstrap();
