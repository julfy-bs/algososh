export const getFibonacciNumbers = (n: number): number[] => {
  let arr: number[] = [];
  for (let i = 0; i < +n + 1; i++) {
    if (arr.length === 0 || arr.length === 1) {
      arr.push(1);
    } else {
      arr.push(arr[i - 2] + arr[i - 1]);
    }
  }
  return arr;
};
