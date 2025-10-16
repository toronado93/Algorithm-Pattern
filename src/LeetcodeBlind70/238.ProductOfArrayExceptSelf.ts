function productExceptSelf(nums: number[]): number[] {
  const n = nums.length;
  const result: number[] = new Array(n).fill(1);

  let prefix = 1;
  for (let i = 0; i < nums.length; i++) {
    // write the prefix
    result[i] = prefix;
    // update the prefix
    prefix *= nums[i];
  }

  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    // write suffix
    result[i] *= suffix;
    // update the suffix
    suffix *= nums[i];
  }

  return result;
}

console.log(productExceptSelf([1, 2, 3, 4]));

// mental model!!!
// product except self is a great example of using prefix and suffix recomposition
// by starting prefix with 1 from left and walkthrough by calculating each products prefix and update it
// then apply same logic for suffix by starting from end of the array and walk through towards beginning
// finally multiply suffix and prefix with reach other gives the production
