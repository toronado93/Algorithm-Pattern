import http from "http";
import { emitter, serverRequestEmitMessager } from "./EmiterController/index";
import routeHandler from "./Routers";

// Server Center Point
const server = http.createServer((req, res) => {
  const { url, method, rawHeaders } = req;

  emitter.emit("Request_Info", url, method, rawHeaders);

  // RouteHandler
  routeHandler(url, req, res);
});

// Emitters
emitter.on("Request_Info", serverRequestEmitMessager);

server.listen(3000, () => {
  console.log("Server is up and running on port 3000");
});
