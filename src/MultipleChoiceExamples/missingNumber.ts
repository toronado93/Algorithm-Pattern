import {
  PerformanceMetric,
  PerformanceMetricAll,
} from "../utility/PerformanceMetric";

// find the missing number

// input [0,1,4] output: 3

// Not optimal solution
function findtheMissingNumber(array: number[]): number[] {
  if (array.length <= 1) return [-1];

  const sortedArray = array;
  const missingNumber: number[] = [];

  //   edges
  const leftEdge = sortedArray[0];
  const rightEdge = sortedArray[sortedArray.length - 1];

  for (let i = leftEdge; i <= rightEdge; i++) {
    const isExist = sortedArray.find((sortedItem) => sortedItem === i);
    if (isExist === undefined) {
      missingNumber.push(i);
    }
  }

  return missingNumber;
}
// optimal solution
function findtheMissingNumberOptimal(array: number[]): number[] {
  if (array.length <= 1) return [-1];

  const cleanArray = new Set(array);
  const missingNumbers: number[] = [];
  const leftEdge = Math.min(...cleanArray);
  const rightEdge = Math.max(...cleanArray);

  for (let i = leftEdge; i <= rightEdge; i++) {
    if (!cleanArray.has(i)) {
      missingNumbers.push(i);
    }
  }
  return missingNumbers;
}
const input = [1, 2, 4, 5, 7, 9, 12, 15];

const performance1 = new PerformanceMetric(findtheMissingNumber, input);
const performance2 = new PerformanceMetric(findtheMissingNumberOptimal, input);

performance1.Execute();
performance2.Execute();

const performanceAll = new PerformanceMetricAll();

performanceAll.Load(findtheMissingNumber, input);
performanceAll.Load(findtheMissingNumberOptimal, input);

performanceAll.ExecuteAll();
