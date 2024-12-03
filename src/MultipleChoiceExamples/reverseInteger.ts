const is32BitInteger = (num: number) => {
  return num >= -Math.pow(2, 31) && num <= Math.pow(2, 31) - 1;
};

const reverseInteger = (x: number) => {
  let isNegatif = x < 0 ? true : false;
  let currentNumber = Math.abs(x);
  let reversed = 0;
  while (currentNumber > 0) {
    const lastdigit = currentNumber % 10;
    reversed = reversed * 10 + lastdigit;
    currentNumber = Math.floor(currentNumber / 10);
  }
  const is32Bit = is32BitInteger(reversed);
  if (!is32Bit) return 0;

  return isNegatif ? -reversed : reversed;
};

console.log(reverseInteger(1534236469));
