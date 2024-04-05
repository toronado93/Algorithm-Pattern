// Question is ; Write a function calles same , which accepts two arrays , The function should return true if every value in the array has its coresponding value squared in the second array. The frequency of value must be the same

const same = (arr1: number[], arr2: number[]) => {
  // Early exit rules
  if (arr1.length !== arr2.length) {
    return false;
  }

  let firstArrayObject: any = {};
  let secondArrayObject: any = {};

  //   read the array and find frequency

  for (let key of arr1) {
    firstArrayObject[key] = (firstArrayObject[key] || 0) + 1;
  }
  for (let key of arr2) {
    secondArrayObject[key] = (secondArrayObject[key] || 0) + 1;
  }

  for (let key in firstArrayObject) {
    const squaredKey = Number(key) ** 2;
    //   check does second array contain the mutipled version of key of first array
    if (!(squaredKey in secondArrayObject)) {
      return false;
    }
    // check the frequency level
    if (firstArrayObject[key] !== secondArrayObject[squaredKey]) {
      return false;
    }
  }

  return true;
};

// Test
const result1 = same([1, 2, 3], [9, 1, 4]);
const result2 = same([1, 2, 3], [1, 9]);
const result3 = same([1, 2, 1], [4, 4, 1]);
console.log(result1, result2, result3);

export {};
