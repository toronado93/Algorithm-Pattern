import spiderSingle from "./spider_Single_Task";

const url = "http://www.example.com";
const appleurl = "http://www.apple.com";

spiderSingle(appleurl, (err, filename, downloaded) => {
  if (err) {
    console.error(err);
  } else if (downloaded) {
    console.log(`Completed the download of "${filename}"`);
  } else {
    console.log(`"${filename}" was already downloaded`);
  }
});
