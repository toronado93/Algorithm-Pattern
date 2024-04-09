import { EventEmitter } from "events";
import { readFile } from "fs";
import { emitter } from "../EmiterController";

const file1filePath = __dirname + "/data_source/file1.txt";
const file2filePath = __dirname + "/data_source/file2.txt";

type FilesType = {
  name: string;
  path: string;
};

class FindRegex extends EventEmitter {
  private regex: string;
  private files: FilesType[];
  private timestamp: number;

  constructor(regex: string) {
    super();
    this.regex = regex;
    this.files = [];
    this.timestamp = new Date().getTime();
  }

  addFile(file: FilesType) {
    this.files.push(file);
    this.emit("fileAdded", file);
    return this;
  }

  asyncFind() {
    for (const file of this.files) {
      readFile(file.path, "utf-8", (err, content) => {
        // error propagating
        if (err) {
          return emitter.emit("error", err);
        }
        this.emit("fileRead", file.name);

        const match = content.match(this.regex);

        if (match) {
          const word = match[0];
          const index = match.index;

          this.emit("found", file.name, word, index);
        }
      });
    }

    return this;
  }

  errorCreator() {
    try {
      if (this.timestamp % 5) {
        this.emit("no_Corraption", this.timestamp);
      } else {
        throw new Error("Error is occured during pleasure" + this.timestamp);
      }
    } catch (error) {
      this.emit("error", error);
    }
    return this;
  }
}

const findRegexInstance = new FindRegex("hello world!");

// Emitters for sync
findRegexInstance
  .on("fileAdded", (file) => {
    console.log(`file- ${file.name} is added to the system`);
  })
  .on("error", (err) => {
    console.log("An Error has occured", err);
  })
  .on("no_Corraption", (timestamp) => console.log("Result:" + (timestamp % 5)));

findRegexInstance.addFile({ name: "file1.txt", path: file1filePath });
findRegexInstance
  .asyncFind()
  .errorCreator()
  .on("fileRead", (file) => console.log("This file is readed", file))
  .on("found", (file, item, index) => {
    console.log(`Item is found File: ${file} item: ${item} index:  ${index} `);
  });

// const parentFunc = async (pr: number) => {
//   console.log("Hey this is sync part-1");

//   try {
//     await new Promise((resolve) => {
//       setTimeout(() => {
//         console.log(`this is an async and execited after ${pr}`);
//         resolve(resolve);
//       }, pr);
//     });
//   } catch (error) {}

//   console.log("parentfunc is completed");
// };

// const parentFunc = async (pr: number) => {
//   console.log("Hey this is sync part-1");

//   new Promise((resolve) => {
//     setTimeout(() => {
//       console.log(`this is an async and execited after ${pr}`);
//       resolve(resolve);
//     }, pr);
//   });

//   console.log("parentfunc is completed");
// };

// parentFunc(3000);
