const num = [3, 4, 5, 1, 2];
const nums2 = [4, 5, 6, 7, 8, 9, 0, 1, 2];

// output is 1

// finding minimum in rotated sorted array
//binary search
function findMin(nums: number[]): number {
  let right = nums.length - 1;
  let left = 0;

  while (left < right) {
    const mid = Math.floor((right + left) / 2);

    if (nums[mid] > nums[right]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return nums[left];
}

console.log(findMin(num));
console.log(findMin(nums2));

export {};

//mental model!!
// i was confuse about getting rid of the mid point when we are updating the left edge then I recieve my answer
// when we are looking for minimum number , and if nums[right] smallar then nums[mid] , which means mid can not include the number we are looking for so there is no point it inlcude it , so we can get rid of it. this is the crucial mental model moment in binary search
