import { readFile } from "fs";

const cache = new Map();

// async functions usually need callback in order to achieve concurrency

type ReturnValue = {
  message: string;
  data: Map<any, any> | string;
  timestamp: number;
};

const asyncReader = (filename: string, cb: (data: ReturnValue) => void) => {
  if (cache.has(filename)) {
    const result_info: ReturnValue = {
      message: "came from cached data",
      data: cache.get(filename),
      timestamp: new Date().getTime(),
    };

    // usage reason of nextTick chedule a callback function to be executed in the next iteration of the event loop, immediately after the current operation completes
    process.nextTick(() => cb(result_info));
  } else {
    readFile(filename, "utf-8", (err, data) => {
      // sending to the cache
      cache.set(filename, data);
      const result_info: ReturnValue = {
        message: "came newly",
        data: data,
        timestamp: new Date().getTime(),
      };

      cb(result_info);
    });
  }
};

export default asyncReader;
