import { readFileSync } from "fs";

const cache = new Map();

const syncReader = (filename: string) => {
  if (cache.has(filename)) {
    return {
      message: "came from cached data",
      data: cache.get(filename),
      timestamp: new Date().getTime(),
    };
  } else {
    const data = readFileSync(filename, "utf8");
    cache.set(filename, data);
    return {
      message: "came newly",
      data: data,
      timestamp: new Date().getTime(),
    };
  }
};

export default syncReader;
