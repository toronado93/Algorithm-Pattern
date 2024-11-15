function findMedianSortedArrays(
  nums1: number[],
  nums2: number[],
  SortingCallback: (array: number[]) => number[]
) {
  const mergedArray = [...nums1, ...nums2];
  console.log("sorted_array", mergedArray);
  const sortedArray = SortingCallback(mergedArray);

  let lengthOfArray = sortedArray.length;

  let middleIndex = Math.floor((sortedArray.length - 1 + 0) / 2);
  console.log("middle Index", middleIndex);

  let isEven = lengthOfArray % 2; // if it is even we recieve 0
  console.log("iseven or odd ", isEven);
  // if statement runs if the number isnt even
  if (!isEven) {
    return (sortedArray[middleIndex] + sortedArray[middleIndex + 1]) / 2;
  } else {
    return sortedArray[middleIndex];
  }
}

class SortingClass {
  constructor() {}
  BubbleSort(array: number[]) {}
  SelectionSort(array: number[]) {}
  QucikSort(array: number[]) {}
  MergeSort(array: number[]) {
    // seperate the given array and call them individually recersive until they than
    function SeperationOfArray(array: number[]): number[] {
      if (array.length <= 1) return array;
      let mid = Math.floor(array.length / 2);
      let leftArray = SeperationOfArray(array.slice(0, mid));
      let rightArray = SeperationOfArray(array.slice(mid));

      return MergingArray(leftArray, rightArray);
    }
    function MergingArray(left: number[], right: number[]): number[] {
      // check while each array has a loop tp go sort them but one side is finish earlier , and the first loop and take care left overs individually
      let result = [];
      let leftIndex = 0;
      let rightIndex = 0;

      while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
          result.push(right[rightIndex]);
          rightIndex++;
        } else {
          result.push(left[leftIndex]);
          leftIndex++;
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
    // bootstrap
    return SeperationOfArray(array);
  }
}

const sorting = new SortingClass();

const { MergeSort } = sorting;

const array1 = [1, 3];
const array2 = [2];

console.log(findMedianSortedArrays(array1, array2, MergeSort));

function findMedianSortedArraysQuickVersion(nums1: number[], nums2: number[]) {
  const sortedArray = [...nums1, ...nums2].sort((a, b) => a - b);
  let lengthOfArray = sortedArray.length;
  let middleIndex = Math.floor((sortedArray.length - 1 + 0) / 2);
  let isEven = lengthOfArray % 2; // if it is even we recieve 0
  // if statement runs if the number isnt even
  if (!isEven) {
    return (sortedArray[middleIndex] + sortedArray[middleIndex + 1]) / 2;
  } else {
    return sortedArray[middleIndex];
  }
}
