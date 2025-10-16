function maxProfit(prices: number[]): number {
  let min = Infinity;
  let bestProfit = 0;

  for (let i = 0; i < prices.length; i++) {
    // update the min and max
    min = Math.min(prices[i], min);
    const profitOpportunity = prices[i] - min;
    bestProfit = Math.max(profitOpportunity, bestProfit);
  }
  return bestProfit;
}

const array1 = [7, 1, 5, 3, 6, 4];
const array2 = [7, 6, 4, 3, 1];

const results = [array1, array2].map((eachArray) => {
  return `The array is [${eachArray}]. For this array best profit result is ${maxProfit(
    eachArray
  )}`;
});

console.log(results);

export {};

// mental model!!!
// easy no need even for explanation
