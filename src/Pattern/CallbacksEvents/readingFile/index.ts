import http from "http";

const time = new Date().getTime();

import asyncReader from "./asyncReader";
import syncReader from "./syncReader";

const pathoftextfile = __dirname + "/data.txt";

// UncaughtException handler
process.on("uncaughtException", (err) => {
  console.error(`This will catch at last the JSON parsing exception:
  ${err.message}`);
  // Terminates the application with 1 (error) as exit code.
  // Without the following line, the application would continue
  process.exit(1);
});

// Create a server

const server = http.createServer((req, res) => {
  const { url, method, rawHeaders } = req;
  const clientAddress = rawHeaders[7];
  const requestTime = new Date().getTime();

  console.log(
    `Http request from "${clientAddress}" MethodType: "${method}" Target Url "${url}"`
  );

  if (url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });

    res.end("Hello World!");

    // sync file read
  } else if (url === "/syncFileRead") {
    const syncresult = syncReader(pathoftextfile);
    const performance = new Date(
      requestTime - syncresult.timestamp
    ).getSeconds();

    console.log(syncresult, `It took ${performance} milisec to complate`);

    const jsonResponse = JSON.stringify(syncresult);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(jsonResponse);
  }

  //   async file read
  else if (url === "/asyncFileRead") {
    asyncReader(pathoftextfile, (err, data) => {
      // Error handling
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Critic error is occured in system");
      } else if (data) {
        const jsonResponse = JSON.stringify(data);
        const performance = new Date(requestTime - data.timestamp).getSeconds();

        console.log(data, `It took ${performance} milisec to complate`);

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(jsonResponse);
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});

setInterval(() => {
  const time2 = new Date().getTime();

  const minutes = new Date(time2 - time).getMinutes();
  const seconds = new Date(time2 - time).getSeconds();

  console.log(
    "server still running",
    "Minutes: " + minutes + " Seconds: " + seconds
  );
}, 1000);
