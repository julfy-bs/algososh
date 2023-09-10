import { getFibonacciNumbers } from './utils/getFibonacciNumbers';

describe('Функция создания массива чисел Фибоначчи работает корректно ', () => {
  it('с индексом меньше 0', () => {
    const fibonacciArray = getFibonacciNumbers(-1);
    expect(fibonacciArray).toEqual([]);
  });
  it('с индексом 0', () => {
    const fibonacciArray = getFibonacciNumbers(0);
    expect(fibonacciArray).toEqual([1]);
  });
  it('с индексом 1', () => {
    const fibonacciArray = getFibonacciNumbers(0);
    expect(fibonacciArray).toEqual([1]);
  });
  it('с индексом 10', () => {
    const fibonacciArray = getFibonacciNumbers(10);
    const expectedArray = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
    expect(fibonacciArray).toEqual(expectedArray);
  });
});
