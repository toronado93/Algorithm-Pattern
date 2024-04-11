import fs from "fs";
import path from "path";
import superagent from "superagent";
import { urlToFilename } from "./utils";

const dirname = __dirname;

function mkdirp(dirname: string, cb: (err: Error | null) => void) {
  fs.mkdir(dirname, { recursive: true }, (err) => {
    cb(err);
  });
}

// save file logic
function saveFile(
  filename: string,
  contents: string,
  cb: (err: null | Error) => void
) {
  //   const timestamp = new Date().getTime();
  const directoryPath = path.join(dirname, filename);

  mkdirp(directoryPath, (err) => {
    if (err) {
      return cb(err);
    }
    fs.writeFile(path.join(directoryPath, filename), contents, cb);
  });
}

//  download logic

function download(
  url: string,
  filename: string,
  cb: (err: null | Error, content?: any) => void
) {
  console.log(`Downloading ${url}`);
  superagent.get(url).end((err, res) => {
    if (err) {
      return cb(err);
    }
    saveFile(filename, res.text, (err) => {
      if (err) {
        return cb(err);
      }
      console.log(`Downloaded and saved: ${url}`);
      cb(null, res.text);
    });
  });
}

// export the main spider

export function spider(
  url: string,
  cb: (err: null | Error, filename?: string, boolean?: boolean) => void
) {
  const filename = urlToFilename(url);
  fs.access(filename, (err) => {
    if (!err || err.code !== "ENOENT") {
      // (1)
      return cb(null, filename, false);
    }
    download(url, filename, (err) => {
      if (err) {
        return cb(err);
      }
      cb(null, filename, true);
    });
  });
}

export default spider;
