function search(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((right + left) / 2);

    if (nums[mid] === target) return mid;

    // left side is ordered
    if (nums[left] < nums[mid]) {
      // target within ordered side
      if (nums[left] <= target && nums[mid] >= target) {
        right = mid + 1;
      } else {
        // target is not in ordered side
        left = mid - 1;
      }
    } else {
      // right side is ordered
      if (target >= nums[mid] && target <= nums[right]) {
        // target within the ordered side
        left = mid - 1;
      } else {
        //target is in pivot side
        right = mid + 1;
      }
    }
  }

  return -1;
}

// mental model!!
//     The main idea is to use binary search to find the target in the array. Binary search is a technique that divides the search space into two halves and compares the target with the middle element. If the target is equal to the middle element, we have found the index. If the target is smaller than the middle element, we search in the left half. If the target is larger than the middle element, we search in the right half. This way, we can reduce the search space by half in each iteration and achieve O(log n) runtime complexity.
// However, since the array is possibly rotated at some unknown pivot, we cannot directly apply binary search. We need to modify it slightly to handle the rotation. The key observation is that one of the two halves must be sorted, and the other half must contain the pivot. For example, if the array is [4,5,6,7,0,1,2], then the left half [4,5,6,7] is sorted and the right half [0,1,2] contains the pivot. If the array is [7,0,1,2,4,5,6], then the right half [2,4,5,6] is sorted and the left half [7,0,1] contains the pivot.
// So, in each iteration of binary search, we first check which half is sorted by comparing the left and middle elements. Then we check if the target is in that sorted half by comparing it with the left and middle elements. If it is in that sorted half, we search in that half as usual. If it is not in that sorted half, we search in the other half that contains the pivot.
// For example, if the array is [4,5,6,7,0,1,2] and the target is 0:
// We start with left = 0 and right = 6. The middle index is 3 and the middle element is 7.
// We see that the left half [4,5,6,7] is sorted and the right half [0,1,2] contains the pivot.
// We check if the target 0 is in the left half by comparing it with 4 and 7. It is not in that half because 0 < 4 < 7.
// So we search in the right half that contains the pivot by setting left = mid + 1 = 4.
// We repeat this process until we find the target or exhaust the search space.

// bootstrap
console.log(search([4, 5, 6, 7, 0, 1, 2], 0));

export {};
