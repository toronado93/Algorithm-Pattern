// Question is : Write a function called maxSubarraySum which accepts an array of integers and a number called n. The function should calculate the maximum sum of n consecutive elements in the array.

const maxSubarraySum = (arr: number[], n: number): number | null => {
  let leftIndex = 0;
  let rightIndex = 1;
  let windowSumUp = arr[leftIndex];
  let superSumUp = 0;

  const maxIndex = arr.length - 1;

  //   Early exit
  if (arr.length <= 0) return null;
  if (arr.length < n) return null;
  if (arr.length === 1) return arr[0];

  //   Start 1,2 gradually make bigger to right scope controll the n number , when window hit the number substract the left one and at one right one each time control the max sum

  // until where loop should be cut off
  while (rightIndex <= maxIndex) {
    // Calculate until reach the limit
    if (rightIndex + 1 <= n) {
      windowSumUp += arr[rightIndex];
      superSumUp = Math.max(superSumUp, windowSumUp);

      rightIndex++;
    }
    // When u reach the limit add next one while substractiong the previous from sumup
    else if (rightIndex + 1 > n) {
      windowSumUp += arr[rightIndex] - arr[leftIndex];

      //   Increase the indexs
      leftIndex++;
      rightIndex++;
      //   Change the  supersum
      superSumUp = Math.max(windowSumUp, superSumUp);
    }
  }
  return superSumUp;
};

const result1 = maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 2);
const result2 = maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 4);
const result3 = maxSubarraySum([4, 2, 1, 6], 1);
const result4 = maxSubarraySum([4, 2, 1, 6, 2], 4);
const result5 = maxSubarraySum([], 4);
const result6 = maxSubarraySum([5], 1);
const result7 = maxSubarraySum([2, 5], 1);
const result8 = maxSubarraySum([2, 5], 2);

console.log(
  result1,
  result2,
  result3,
  result4,
  result5,
  result6,
  result7,
  result8
);

export {};
