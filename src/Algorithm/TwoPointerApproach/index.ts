// Question is write a function called sumZero which accepts a sorted array of integers. The function should find the first pair where the sum is 0. Return an array that includes both values that sum to zero or undefined if a pair does not exist

const sumZero = (arg: number[], condition = 0): number[] | undefined => {
  if (arg.length <= 0) {
    console.log("array is empty");
    return undefined;
  }

  let leftIndex = 0;
  let rightIndex = arg.length - 1;

  while (leftIndex < rightIndex) {
    const currentvalue = arg[leftIndex] + arg[rightIndex];

    if (currentvalue === condition) {
      return [arg[leftIndex], arg[rightIndex]];
    } else if (currentvalue < condition) {
      leftIndex++;
    } else if (currentvalue > 0) {
      rightIndex--;
    }
  }

  return undefined;
};

const result1 = sumZero([-3, -2, -1, 0, 1, 2, 3]);
const result2 = sumZero([-2, 0, 1, 3]);
const result3 = sumZero([1, 2, 3]);
const result4 = sumZero([-4, -3, -2, -1, 0, 1, 2, 5]);

console.log(result1, result2, result3, result4);

// Another Question is Implement a fuction called countUniqueValues , which accepts a sorted array. There can be negative numbers in the array , but it will always be sorted.
// basically we gonna find how many different type of number

const countUniqueValues = (arg: number[]): number[] | number => {
  let leftIndex = 0;
  let rightIndex = arg.length - 1;
  let counter = 1;

  if (arg.length <= 0) return 0;
  if (arg.length === 1) return 1;

  while (leftIndex < rightIndex) {
    // Left side logic
    if (arg[leftIndex] === arg[leftIndex + 1]) {
      leftIndex++;
    } else if (arg[leftIndex] !== arg[leftIndex + 1]) {
      counter++;
      leftIndex++;
    }

    // right side logic
    if (arg[rightIndex] === arg[rightIndex - 1]) {
      rightIndex--;
    } else if (arg[rightIndex] !== arg[rightIndex - 1]) {
      rightIndex--;
      counter++;
    }
  }
  return counter;
};

const result1a = countUniqueValues([1, 1, 1, 1, 1, 2]);
const result1b = countUniqueValues([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13]);
const result1c = countUniqueValues([]);
const result1d = countUniqueValues([-2, -1, -1, 0, 1]);

console.log(result1a, result1b, result1c, result1d);

export {};
