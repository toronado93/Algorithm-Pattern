// const reverse = (string: string): string => {
//   const newArray: string[] = [];

//   function helper(string: string) {
//     // base
//     if (string.length === 0) return;

//     // d.v
//     helper(string.slice(1));

//     // center logic
//     newArray.push(string[0]);
//   }

//   helper(string);

//   return newArray.join("");
// };
// console.log(reverse("abc"));

// //  power
// const power = (base: number, pow: number): number => {
//   if (pow === 0) return 1;

//   return base * power(base, pow - 1);
// };
// console.log(power(2, 3));

// // flatten
// const flatten = (array: any): number[] => {
//   let newArray: number[] = [];

//   for (let i = 0; i < array.length; i++) {
//     // base
//     if (Array.isArray(array[i])) {
//       newArray = newArray.concat(flatten(array[i] as number[]));
//     } else {
//       newArray.push(array[i] as number);
//     }
//   }

//   return newArray;
// };

// console.log(flatten([1, 2, [3, 5], 4, 7, [9, 99], [7, 3, [42, 44]]]));

// // capitalfirst
// const capitalFirst = (array: string[]) => {
//   const newArr: string[] = [];

//   function helper(array: string[]) {
//     if (array.length === 0) return;

//     newArr.push(array[0][0].toLocaleUpperCase() + array[0].substring(1));
//     helper(array.slice(1));
//   }
//   helper(array);
//   return newArr;
// };

// console.log(capitalFirst(["banana", "tom", "cat"]));

// // full capital

// const fullCapital = (array: string[]) => {
//   const newArr: string[] = [];

//   function helper(array: string[]) {
//     if (array.length === 0) return;
//     newArr.push(array[0].toUpperCase());
//     helper(array.slice(1));
//   }

//   helper(array);

//   return newArr;
// };
// console.log(fullCapital(["banana", "tom", "cat"]));

// // Full capital and reverse

// const fullCapitalAndReverse = (array: string[]) => {
//   const newArr: string[] = [];

//   function helper(array: string[]) {
//     if (array.length === 0) return;

//     helper(array.slice(1));
//     newArr.push(array[0].toUpperCase());
//   }
//   helper(array);
//   return newArr;
// };
// console.log(fullCapitalAndReverse(["banana", "tom", "cat"]));

// //you re given three item in one array reverse them (itself and also inside of array) and make the first one capital , the first before the reverse
// const exampleArray = ["tom", "cat", "banana"];

// const compharensiveReverse = (array: string[]) => {
//   const newArray: string[] = [];

//   function helper(array: string[]) {
//     // base
//     // d.v
//     // logic make it reverse inner and outter
//     if (array.length === 0) return;
//     helper(array.slice(1));
//     // if array[0] is banana make the magic
//     // make iteration then join and push to the newarray
//     let tempmember = [];
//     for (let i = array[0].length - 1; i >= 0; i--) {
//       // make first one capital
//       if (i === 0) {
//         tempmember.push(array[0][i].toUpperCase());
//       } else {
//         tempmember.push(array[0][i]);
//       }
//     }
//     newArray.push(tempmember.join(""));
//   }
//   helper(array);
//   return newArray;
// };
// console.log(compharensiveReverse(exampleArray));

// //Question is  Write a function called stringifyNumber which takes in an object and finds all of the values which are numbers and converts them to strings

// const obj = {
//   key1: 1,
//   key2: "3",
//   key3: 5,
//   key4: 6,
// };

// const stringifyNumber = (argument: any) => {
//   const array = [];

//   for (const key in argument) {
//     if (typeof argument[key] === "number") {
//       console.log(
//         key + " has number type of value and it is: " + argument[key]
//       );
//       array.push({ key: key, value: argument[key] });
//       argument[key] = String(argument[key]);
//       console.log(
//         "value: " +
//           argument[key] +
//           " is turned into the string it is belong the :" +
//           key
//       );
//     }
//   }

//   return { newObj: obj, filteredObjectMembers: array };
// };

// console.log(stringifyNumber(obj));

// // Flatten Again

// const exampleArrayAgain = [
//   1,
//   2,
//   [5, 6, 7, [9, 12, 13], [4, 5]],
//   31,
//   31,
//   [[[[[888]], 41]]],
// ];
// const flattenArrayAgain = (array: any) => {
//   const newArray: any[] = [];

//   function helper(array: any) {
//     for (let i = 0; i < array.length; i++) {
//       if (Array.isArray(array[i])) {
//         // recursion
//         helper(array[i]);
//       } else {
//         newArray.push(array[i]);
//       }
//     }
//   }

//   helper(array);

//   return newArray;
// };

// console.log(flattenArrayAgain(exampleArrayAgain));

// export {};

//  Turing Questions

function generateSubsetsRecursive(s: string): any {
  const subsets: any[] = [];

  function helper(current: any, index: number) {
    // base condition
    if (index === s.length) {
      subsets.push(current);
      return;
    }
    // MEMOISATION
    // Exclude the current character
    helper(current, index + 1);
    // Include the current character
    helper(current + s[index], index + 1);
  }

  helper("", 0);

  return subsets;
}

const s = "12345";

console.log(generateSubsetsRecursive(s));
