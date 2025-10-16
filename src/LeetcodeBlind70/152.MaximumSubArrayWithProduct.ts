const numArray = [2, 3, -2, 4];
const numArray2 = [-2, 0, -1];
function maximumSubArrayWithProduct(nums: number[]): number {
  if (nums.length === 0) return 0;

  let minProd = nums[0];
  let maxProd = nums[0];
  let best = nums[0];

  for (let i = 1; i < nums.length; i++) {
    const current = nums[i];

    //( handle negative flipping
    if (current < 0) {
      [minProd, maxProd] = [maxProd, minProd];
    }
    maxProd = Math.max(current, maxProd * current);
    minProd = Math.min(current, minProd * current);

    best = Math.max(maxProd, best);
  }

  return best;
}

console.log(maximumSubArrayWithProduct(numArray));
console.log(maximumSubArrayWithProduct(numArray2));

//mental model!!!
//Think of the array as a running chain of multiplications where every element can flip your fortunes.  Track two running products: maxProd is the best product ending at the current index; minProd is the worst. The “worst” matters because a negative × negative can rebound into the new best. Process each element: start both trackers at the first number. For each new value, copy the previous maxProd/minProd. Negative switch: when the current number is negative, swap the old max and min—multiplying by a negative flips their roles.Extend or restart: update maxProd to be the larger of “start fresh with the current number” or “extend the streak by multiplying.” Do the mirror image with minProd. Remember the best: after each step, compare maxProd against a global best answer. Zeros naturally reset the streak, positive numbers keep pushing the max upward, and pairs of negatives turn the stored minimum into your new maximum.
