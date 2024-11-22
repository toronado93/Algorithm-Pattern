// question is
// The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

// P   A   H   N
// A P L S I I G
// Y   I   R
// And then read line by line: "PAHNAPLSIIGYIR"

// Write the code that will take a string and make this conversion given a number of rows:

// string convert(string s, int numRows);

// task
// see if row number  equal to the 1  or is row number bigger than length of the string return the same string
// create a row array , length of the array will be the amount of givenrow , basically we seperates the row
// create goingdown booelan that allows us to write oncoming item to correct place
// loop through entrie string and add each char to the relevant row while checking for the length . when you add new char lopp treversal up or down depens of the boolean and currentrow ,  once you reach the bottom row switch boolean and loop through reverse

function ZigZagConversion(s: string, numRows: number): string {
  if (s.length === 1 || numRows > s.length || numRows === 1) return s;

  const row = Array.from({ length: numRows }).fill("");
  let goingDown = true;
  let currentRow = 0;

  for (const char of s) {
    // top edge
    if (currentRow === 0) {
      row[currentRow] += char;
      goingDown = true;
    }
    // bottom edge
    if (currentRow === numRows - 1) {
      row[currentRow] += char;
      goingDown = false;
    }
    // Intermediate elements
    if (currentRow !== 0 && currentRow !== numRows - 1) {
      row[currentRow] += char;
    }

    // direction
    if (goingDown) {
      currentRow++;
    } else {
      currentRow--;
    }
  }

  return row.join("");
}

console.log(ZigZagConversion("AB", 1));
