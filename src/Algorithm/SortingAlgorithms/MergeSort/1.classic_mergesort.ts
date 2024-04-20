function MergeSort(arr: number[]): number[] {
  // base code
  if (arr.length <= 1) return arr;

  let mid = Math.floor(arr.length / 2);

  let sortedLeft = MergeSort(arr.slice(0, mid));
  let sortedRight = MergeSort(arr.slice(mid));

  return Merge(sortedLeft, sortedRight);
}

function Merge(left: number[], right: number[]) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  //   if there is leftover

  while (leftIndex < left.length) {
    result.push(left[leftIndex]);
    leftIndex++;
  }
  while (rightIndex < right.length) {
    result.push(right[rightIndex]);
    rightIndex++;
  }

  return result;
}

console.log(MergeSort([5, 7, 1, 2, 6, 9, 4, 3, 6, 0, 9, 9, 0, 8, 4]));

export {};
