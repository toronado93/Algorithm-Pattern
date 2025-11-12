import Fastify from "fastify";
import initializeRabbitMQ from "./rabbitmq_con";

const app = Fastify({ logger: true });
const PORT = 3001;

initializeRabbitMQ()
  .then((rabbit) => {
    console.log("??????Rabbit_connection is established from RECIEVER");

    // create channel
    rabbit?.connection.createChannel().then((channel) => {
      channel.assertQueue("QUEUE1", { durable: false });

      channel.consume(
        "QUEUE1",
        function (msg) {
          if (!msg) return;
          console.log(" [x] Received %s", msg.content.toString());
        },
        {
          noAck: true,
        }
      );
    });
  })
  .catch((err) => {
    console.log("Error occured when reciever tried to connect with rabbitmq ");
  });

app.get("/", async () => ({ hello: "world" }));

app
  .listen()
  .then(() => {
    console.log("Server rabbit mq reciever up and run!");
  })
  .catch((err) => {
    app.log.error(err);
    process.exit(1);
  });
