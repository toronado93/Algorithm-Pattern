function containsDuplicate(nums: number[]): boolean {
  const hashMap = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    if (hashMap.has(current)) {
      return true;
    }
    hashMap.set(current, i);
  }
  return false;
}

const nums1 = [1, 2, 3, 1];
const nums2 = [1, 2, 3, 4];
const nums3 = [1, 1, 1, 3, 3, 4, 3, 2, 4, 2];

const result = [nums1, nums2, nums3].map(containsDuplicate);
console.log(result);

export {};

// mental model!!!
// create a hashmap and start to walkthrough on array and save each value in index by value goes to key and index goes to value
// each new element should be check with hashmap if hashmap already has this newcomer which means there is an duplicate
