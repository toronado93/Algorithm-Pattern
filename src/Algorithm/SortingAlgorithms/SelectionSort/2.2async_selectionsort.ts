// this example we create async selectionsort by using keywords

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

function SelectionSort(arr: number[]): Promise<number[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
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
      resolve(arr);
    }, 0);
  });
}

(async function () {
  console.log("Begging scope");

  //   we got two function selectionsort needs the generaterandomarray

  const randomArray = generateRandomArray(100000, 1, 100);

  const result = await SelectionSort(randomArray);
  console.log(result);

  //   but selectionsort is so expensive and we dont want scope waits the result

  console.log("Ending scope");
})();

export {};
