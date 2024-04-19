// Scenario , we wanna create such a structure , big scope carres on generaterandomarray works in async manner
// and also inside of generaterandomarray we dont want scope tick waits until result of bubblesorting array , so we want constant I/0 for either bigscope and generaterandomarray in order to achieve this we dont use await keyword
// there is a amazing staff going on here , as we dont use await anymore , generaterandomarray function never waits the result of bubblesorting
//function carry on and we see the result of bubblesorting asynchronously after its than with the help of then method.

function BubbleSorting(arr: any[]): Promise<any[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      for (let i = arr.length - 1; i > 0; i--) {
        // innerloop

        // optimization
        let isAnyChangingHaveOccured = false;

        for (let j = 0; j < i; j++) {
          isAnyChangingHaveOccured = true;
          if (arr[j] > arr[j + 1]) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          }
        }
        // optimization bootstrap
        if (!isAnyChangingHaveOccured) break;
      }
      // console.log(arr);
      resolve(arr);
    }, 0);
  });
}

function generateRandomArray(
  length: number,
  min: number,
  max: number,
  cb: (arr: number[]) => Promise<any[]>
) {
  const randomArray: any[] = [];
  for (let i = 0; i < length; i++) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    randomArray.push(randomNumber);
  }
  cb(randomArray).then(
    (resultfromresolver) => console.log(resultfromresolver),
    (err) => console.log("If there is any error", err)
  );
  console.log("rest of the logic has to wait result of callback function");
}

// console.log(generateRandomArray(100000, 1, 999, BubbleSorting));

// big scope example is really crucial , in this example we made bubblesorting a promise ,
// and inside of generateRandomArray function we use bubblesorting in async way the think is if we but async tag front of an function it doesnt make this
// function a async , it only allows us to use relavant await key tag , I mean when you put async tag front of a function you should know , there is a async
// function is used inside it. In order to make a function async it needs to be promise

function bigScope() {
  console.log("before");
  generateRandomArray(100000, 1, 999, BubbleSorting);
  console.log("after");
}
console.log(bigScope());

export {};
