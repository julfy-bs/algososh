import { swap } from './swap';

describe('Функция перестановки элементов массива работает корректно', () => {
  it('первый элемент становится последним', () => {
    const array = [1, 2, 3];
    const arrayUnsortedCopy = [...array];
    swap(array, 0, 2);
    const index = array.findIndex(item => item === 1)
    expect(arrayUnsortedCopy[0]).toEqual(array[index]);
  });
});
