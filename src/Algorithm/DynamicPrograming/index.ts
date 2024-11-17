// question  Longest Palindromic Substring
// Given a string s, return the longest

// Example 1:

// Input: s = "babad"
// Output: "bab"
// Explanation: "aba" is also a valid answer.
// Example 2:

// Input: s = "cbbd"
// Output: "bb"

// expand arround center approach

// PSUEDO
// early exit if given string less than 1 return empty
// create start and end point with 0

//create helper problem name called expandaroundcenter
// this helper problem takes two number left and right , this left and right simulates the growing from center
// expand around functions is a loop that detect the length of polidrome and return length of it

// we back to the main funciton , inside of main function we create a loop this goes through from beginning to end of given string
// each letter are treated as potential center of a palindrome
// we dont know if there is odd or even palindrome so we need to use helper method twice with different input and obtain biggest length by using max method
// after obtain length of palidrome we need to update the current start and end point if they are shorten ten current length in order to return longest palindrom
// at the end return the palindrome by using start and end point with substring method

function longestPalindrome(s: string): string {
  if (s.length < 1) return "";

  let start = 0;
  let end = 0;

  function expandAroundCenter(left: number, right: number): number {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    // gives the length of palindrome
    return right - left - 1;
  }

  for (let i = 0; i < s.length; i++) {
    //even palindrome
    const len1 = expandAroundCenter(i, i);
    // odd plaindrome
    const len2 = expandAroundCenter(i, i + 1);

    const absoluteLength = Math.max(len1, len2);

    //if oncoming palindrome bigger than current , update it
    if (absoluteLength > end - start) {
      // find the location with pointer logic
      start = i - Math.floor((absoluteLength - 1) / 2);
      end = i + Math.floor(absoluteLength / 2);
    }
  }
  console.log(start, end);
  return s.substring(start, end + 1);
}

console.log(longestPalindrome("babad"));
