// classic bubble sort junior developer manner no callback or anything

function BubbleSorting(arr: any[]) {
  //   first loop for limitation
  for (let i = arr.length - 1; i > 0; i--) {
    // innerloop

    // optimization
    let isAnyChangingHaveOccured = false;

    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        isAnyChangingHaveOccured = true;
      }
    }
    // optimization bootstrap
    if (!isAnyChangingHaveOccured) break;
  }

  return arr;
}

function generateRandomArray(length: number, min: number, max: number) {
  const randomArray = [];
  for (let i = 0; i < length; i++) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    randomArray.push(randomNumber);
  }

  return randomArray;
}

console.log(BubbleSorting(generateRandomArray(100, 1, 999)));

function BUBLESORTING(givenarray: number[]) {
  for (let i = givenarray.length - 1; 0 <= i; i--) {
    let isChanged = false;

    for (let j = 0; j < i; j++) {
      if (givenarray[j] > givenarray[j + 1]) {
        [givenarray[j], givenarray[j + 1]] = [givenarray[j + 1], givenarray[j]];
        isChanged = true;
      }
    }
    if (!isChanged) break;
  }

  return givenarray;
}

console.log(BUBLESORTING(generateRandomArray(100, 1, 999)));

export {};
