function binarySearch(arr: number[], target: number) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    // Check if target is present at mid
    if (arr[mid] === target) {
      return mid;
    }

    // If target is greater, ignore left half
    if (arr[mid] < target) {
      left = mid + 1;
    }
    // If target is smaller, ignore right half
    else {
      right = mid - 1;
    }
  }

  // If we reach here, then the element was not present
  return -1;
}

const sortedArray = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
const targetElement = 11;
const index = binarySearch(sortedArray, targetElement);
if (index !== -1) {
  console.log(`Element ${targetElement} found at index ${index}.`);
} else {
  console.log(`Element ${targetElement} not found in the array.`);
}
