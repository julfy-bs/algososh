/**
 * @function
 * @name swap
 * Переставляет местами элементы массива.
 * @example
 * const array = [1, 2, 3]
 * swap(array, 0, 2);
 * // порядок элементов в массиве array изменился на [3, 2, 1]
 * @param {Array} array Массив в котором нужно передвинуть элементы.
 * @param {Number} start Первый элемент массива.
 * @param {Number} end Второй элемент массива.
 */
export const swap = (array: unknown[], start: number, end: number): void => {
  const temp = array[start];
  array[start] = array[end];
  array[end] = temp;
};
