// //push the zero end of the array while maintaining the right order
// //input [7,3,0,2,9]
let nums = [0, 1, 0, 12, 3];
// // let nums = [0, 1, 0, 3, 12];
// let nums = [0, 1, 0, 3, 12, 0, 7, 5, 14, 1];
// //output
// let output = [1, 3, 12, 0, 0];

const pushZeroEndMain = (array: number[]) => {
  //apply classic sorthing with two pointer
  //after it has been done , run zero detector and find out how many zero exist in the array
  //the amount of zero shift the array from right to left and add zeros and of the array
  const sortedArray = arraySorter(array);
  const howManyZero = zeroDetector(sortedArray);
  const swiftedArrayResult = swiftAndPush(sortedArray, howManyZero);
  console.log(swiftedArrayResult);
};

const arraySorter = (array: number[]) => {
  // two pointer array sorter
  for (let j = array.length; j > 0; j--) {
    let optimizer = true;
    for (let i = 0; i < j; i++) {
      // if it is zero push it to the end
      if (array[i] === 0) {
        [array[i], array[j - 1]] = [array[j - 1], array[i]];
        optimizer = false;
      }
      // check the current i with oncoming i if current i bigger than oncoming i swap them
      else if (array[i] > array[i + 1]) {
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        optimizer = false;
      }
    }
    if (optimizer) break;
  }

  return array;
};

const zeroDetector = (array: number[]): number => {
  let i = 0;
  let counter = 0;

  while (i < array.length) {
    if (array[i] === 0) counter++;
    i++;
  }

  return counter;
};

const swiftAndPush = (array: number[], zeroAmount: number): number[] => {
  let initialpointer = 0;
  // swifted
  for (let i = zeroAmount; i < array.length; i++) {
    array[i - zeroAmount] = array[i];
  }

  // // fill with zero
  for (let i = array.length - 1; zeroAmount > 0; i--) {
    array[i] = 0;
    zeroAmount--;
  }

  return array;
};

// faster way
const pushZeroEnd = (nums: number[]): number[] => {
  let insertPos = 0;

  // Move non-zero elements to the front
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[insertPos] = nums[i];
      insertPos++;
    }
  }

  // Fill the rest with 0s
  for (let i = insertPos; i < nums.length; i++) {
    nums[i] = 0;
  }

  return nums;
};

// console.log(pushZeroEnd(nums));
