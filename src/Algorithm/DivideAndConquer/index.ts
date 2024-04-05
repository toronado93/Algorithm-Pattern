// Question is: Given a sorted array of integers , write a function called search , that accepts a value and returns the index where the value passed to the function is located. If the value is not found , return -1

const search = (arr: number[], number: number): number => {
  let leftIndex = 0;
  let rightIndex = arr.length - 1;

  while (leftIndex <= rightIndex) {
    const middleIndex = Math.floor((rightIndex + leftIndex) / 2);

    if (arr[middleIndex] === number) {
      return middleIndex;
    } else if (arr[middleIndex] > number) {
      rightIndex = middleIndex - 1;
    } else if (arr[middleIndex] < number) {
      leftIndex = middleIndex + 1;
    }
  }

  return -1;
};

const result1 = search([1, 2, 3, 4, 5, 6], 4);
const result2 = search([1, 2, 3, 4, 5, 6], 6);
const result3 = search([1, 2, 3, 4, 5, 6], 11);

console.log(result1, result2, result3);

export {};
