import fs from "fs";
import path from "path";
import superagent from "superagent";

import { urlToFilename, getPageLinks } from "./utility";

function mkdirp(dirname: string, cb: (err: Error | null) => void) {
  fs.mkdir(dirname, { recursive: true }, (err) => {
    cb(err);
  });
}

// @ts-ignore
function saveFile(filename, contents, cb) {
  // @ts-ignore
  mkdirp(path.dirname(filename), (err) => {
    if (err) {
      return cb(err);
    }
    fs.writeFile(filename, contents, cb);
  });
}

// @ts-ignore
function download(url, filename, cb) {
  console.log(`Downloading ${url}`);
  superagent.get(url).end((err, res) => {
    if (err) {
      return cb(err);
    }
    // @ts-ignore
    saveFile(filename, res.text, (err) => {
      if (err) {
        return cb(err);
      }
      console.log(`Downloaded and saved: ${url}`);
      cb(null, res.text);
    });
  });
}
// @ts-ignore
function spiderLinks(currentUrl, body, nesting, cb) {
  if (nesting === 0) {
    // Remember Zalgo from chapter 3?
    return process.nextTick(cb);
  }
  const links = getPageLinks(currentUrl, body); // (1)
  if (links.length === 0) {
    return process.nextTick(cb);
  }
  // @ts-ignore
  function iterate(index) {
    // (2)
    if (index === links.length) {
      return cb();
    }
    // @ts-ignore
    spider(links[index], nesting - 1, function (err) {
      // (3)
      if (err) {
        return cb(err);
      }
      iterate(index + 1);
    });
  }
  iterate(0); // (4)
}

export { spiderLinks };

// @ts-ignore
export function spider(url, nesting, cb) {
  const filename = urlToFilename(url);
  fs.readFile(filename, "utf8", (err, fileContent) => {
    if (err) {
      if (err.code !== "ENOENT") {
        return cb(err);
      }

      // The file doesn't exist, so let’s download it
      // @ts-ignore
      return download(url, filename, (err, requestContent) => {
        if (err) {
          return cb(err);
        }

        spiderLinks(url, requestContent, nesting, cb);
      });
    }

    // The file already exists, let’s process the links
    spiderLinks(url, fileContent, nesting, cb);
  });
}
