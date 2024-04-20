function generateRandomArray(
  length: number,
  min: number,
  max: number,
  callback: () => void
) {
  const randomArray = [];
  for (let i = 0; i < length; i++) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    randomArray.push(randomNumber);
  }
  callback();
  return randomArray;
}
function MergeSort(arr: number[]): number[] {
  // base code
  if (arr.length <= 1) return arr;

  let mid = Math.floor(arr.length / 2);

  let sortedLeft = MergeSort(arr.slice(0, mid));
  let sortedRight = MergeSort(arr.slice(mid));

  return Merge(sortedLeft, sortedRight);
}

function Merge(left: number[], right: number[]) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  //   if there is leftover

  while (leftIndex < left.length) {
    result.push(left[leftIndex]);
    leftIndex++;
  }
  while (rightIndex < right.length) {
    result.push(right[rightIndex]);
    rightIndex++;
  }

  return result;
}

function AsyncTask(arr: number[]): Promise<number[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MergeSort(arr));
    }, 0);
  });
}

(function () {
  console.log("scope ticking");
  const randomArray = generateRandomArray(10000000, 2, 99, () => {
    console.log("Random array is generate");
  });
  AsyncTask(randomArray).then(
    (result) => {
      console.log("MergeSort function is completed", result);
    },
    (err) => {
      console.log(err);
    }
  );
  console.log("main scope is finished");
})();

export {};
