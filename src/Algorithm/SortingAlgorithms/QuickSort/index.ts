function quickSort(givinarray: number[]): number[] {
  if (givinarray.length <= 1) return givinarray;
  const pivot = givinarray[0];
  const smaller: number[] = [];
  const larger: number[] = [];

  for (let i = 1; i < givinarray.length; i++) {
    if (givinarray[i] < pivot) {
      smaller.push(givinarray[i]);
    } else {
      larger.push(givinarray[i]);
    }
  }
  return [...quickSort(smaller), pivot, ...quickSort(larger)];
}

const randomArray = [8, 6, 5, 1, 2, 7, 4, 6, 9, 9, 5];
const randomArray1 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

console.log(quickSort(randomArray));
// console.log(quickSort(randomArray1));
