const nums1 = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
const nums2 = [-2, -1];

function maxSubArray(nums: number[]): number {
  let max_current = -Infinity;
  let max_global = -Infinity;
  for (let i = 0; i < nums.length; i++) {
    max_current = Math.max(nums[i], max_current + nums[i]);
    max_global = Math.max(max_global, max_current);
  }
  return max_global;
}

console.log(maxSubArray(nums2));

// mental model!!!!!
// kadane keeps a running "best subarray ending here" value and grows the answer in one forward pass ,
// global variable keeps the best sum while max_current calculates the current sub_arrays sum and allows to go kinda substract by letting current index value and its addition with current sub array addition , which is Math.max(nums[i], nums[i]+current_sum)
