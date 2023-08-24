export const swap = (array: unknown[], start: number, end: number): void => {
  const temp = array[start];
  array[start] = array[end];
  array[end] = temp;
};
