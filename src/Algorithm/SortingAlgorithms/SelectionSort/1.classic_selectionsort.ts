function generateRandomArray(
  length: number,
  min: number,
  max: number
): number[] {
  const randomArray: number[] = [];
  for (let i = 0; i < length; i++) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    randomArray.push(randomNumber);
  }
  return randomArray;
}

function SelectionSort(
  arr: number[],
  callback: (sortedArray: number[]) => void
): void {
  for (let i = 0; i < arr.length; i++) {
    let min = arr[i];
    let index = i;

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < min) {
        min = arr[j];
        index = j;
      }
    }
    [arr[i], arr[index]] = [arr[index], arr[i]];
  }

  callback(arr);
}

const MultipleTask = (
  generateFunction: () => number[],
  sortFunction: (array: number[], callback: (arr: number[]) => void) => void,
  resultHandler: (result: number[]) => void
) => {
  console.log("Generating random array...");
  const randomArray = generateFunction();
  console.log("Sorting array...");
  sortFunction(randomArray, resultHandler);
};

(function () {
  console.log("Before");
  MultipleTask(
    () => generateRandomArray(10000, 1, 99),
    SelectionSort,
    (result) => {
      console.log("Sorted result:", result);
    }
  );
  console.log("After");
})();

export {};
