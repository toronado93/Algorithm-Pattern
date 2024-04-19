// Scenario , we have three tick in big scope , and wanna create async bubble sorting in order to not block I/O process
// bellow function structure achieve this but when we use async await keyword for generaterandomarray function , await blocks generaterandomarray function itself
// and function is freezed there therefore we wont see the line of console.log("rest of the logic has to wait result of callback function"); until result comes back from callback , but while this happening big scope carrys on bcoz generaterandomarray function gives control backto event loop while it is waiting its async callback to be finished , so there is a nice magic here

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

async function generateRandomArray(
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

  const result = await cb(randomArray);
  console.log(result);

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
