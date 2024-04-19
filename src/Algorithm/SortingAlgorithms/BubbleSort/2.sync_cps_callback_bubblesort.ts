// classic sync bubblesorting with callback style
function BubbleSorting(arr: any[]) {
  //   first loop for limitation
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

  return arr;
}

function generateRandomArray(
  length: number,
  min: number,
  max: number,
  cb: (arr: number[]) => {}
): void {
  const randomArray = [];
  for (let i = 0; i < length; i++) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    randomArray.push(randomNumber);
  }
  const result = cb(randomArray);

  console.log(result);
  console.log("rest of the logic has to wait result of callback function");
}

console.log(generateRandomArray(100000, 1, 999, BubbleSorting));

export {};
