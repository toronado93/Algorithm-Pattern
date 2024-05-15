console.log("Hello world");

function promisefunc1(): Promise<string> {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      rejected("sad times");
    }, 1000);
  });
}

promisefunc1()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => console.log(err));
