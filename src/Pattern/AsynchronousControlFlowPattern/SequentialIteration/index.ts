import { spider } from "./spider";

const appleurl = "http://www.apple.com";
const nesting = 3;

// @ts-ignore
spider(appleurl, nesting, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("Download complete");
});
