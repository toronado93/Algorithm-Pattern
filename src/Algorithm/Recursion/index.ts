//  reverse

const reverse = (string: string): string => {
  const newArray: string[] = [];

  function helper(string: string) {
    // base
    if (string.length === 0) return;

    // d.v
    helper(string.slice(1));

    // center logic
    newArray.push(string[0]);
  }

  helper(string);

  return newArray.join("");
};
console.log(reverse("abc"));

//  power
const power = (base: number, pow: number): number => {
  if (pow === 0) return 1;

  return base * power(base, pow - 1);
};
console.log(power(2, 3));

// flatten
const flatten = (array: any): number[] => {
  let newArray: number[] = [];

  for (let i = 0; i < array.length; i++) {
    // base
    if (Array.isArray(array[i])) {
      newArray = newArray.concat(flatten(array[i] as number[]));
    } else {
      newArray.push(array[i] as number);
    }
  }

  return newArray;
};

console.log(flatten([1, 2, [3, 5], 4, 7, [9, 99], [7, 3, [42, 44]]]));

// capitalfirst
const capitalFirst = (array: string[]) => {
  const newArr: string[] = [];

  function helper(array: string[]) {
    if (array.length === 0) return;

    newArr.push(array[0][0].toLocaleUpperCase() + array[0].substring(1));
    helper(array.slice(1));
  }
  helper(array);
  return newArr;
};

console.log(capitalFirst(["banana", "tom", "cat"]));

// full capital

const fullCapital = (array: string[]) => {
  const newArr: string[] = [];

  function helper(array: string[]) {
    if (array.length === 0) return;
    newArr.push(array[0].toUpperCase());
    helper(array.slice(1));
  }

  helper(array);

  return newArr;
};
console.log(fullCapital(["banana", "tom", "cat"]));

// Full capital and reverse

const fullCapitalAndReverse = (array: string[]) => {
  const newArr: string[] = [];

  function helper(array: string[]) {
    if (array.length === 0) return;

    helper(array.slice(1));
    newArr.push(array[0].toUpperCase());
  }
  helper(array);
  return newArr;
};
console.log(fullCapitalAndReverse(["banana", "tom", "cat"]));

export {};
