import { sortWithBubble } from './utils/sortWithBubble';
import { sortWithSelection } from './utils/sortWithSelection';
import { createRandomArray } from './utils/createRandomArray';
import { Direction, SortElement } from '../../types/sort';
import { ElementStates } from '../../types/element-states';
import { RANDOM_ARRAY_MAX_LENGTH, RANDOM_ARRAY_MIN_LENGTH } from '../../constants/algorithmsRules';

describe('Создание массива работает корректно', () => {
  it('длина массива больше или равна значению константы', () => {
    const newArray = createRandomArray();
    expect(newArray.length).toBeGreaterThanOrEqual(RANDOM_ARRAY_MIN_LENGTH);
  });

  it('длина массива меньше или равна значению константы', () => {
    const newArray = createRandomArray();
    expect(newArray.length).toBeLessThanOrEqual(RANDOM_ARRAY_MAX_LENGTH);
  });

  it('длина массива больше или равна значению переданного параметра', () => {
    const minLength = 100;
    const newArray = createRandomArray({ minLength });
    expect(newArray.length).toBeGreaterThanOrEqual(minLength);
  });

  it('длина массива меньше или равна значению переданного параметра', () => {
    const maxLength = 100;
    const newArray = createRandomArray({ maxLength });
    expect(newArray.length).toBeLessThanOrEqual(maxLength);
  });

  describe('для значения массива', () => {
    const minLength = 100;
    const minValue = 1;
    const maxValue = 10;
    const newArray = createRandomArray({ minLength, minValue, maxValue });

    test.each(newArray)('значение входит в диапазон допустимых значений', () => {
      const resultArray: number[] = [];
      newArray.forEach(item => resultArray.push(item.value));
      const result = resultArray.every(item => item >= minValue && item <= maxValue);
      expect(result).toBeTruthy();
    });
  });
});

describe('Сортировка работает корректно алгоритмом', () => {
  let array: SortElement[] = [];
  let expectedArray: SortElement[] = [];
  let sortedArray: SortElement[][] = [[]];

  beforeEach(() => {
    array = [];
    expectedArray = [];
    sortedArray = [[]];
  });

  describe('выбора', () => {
    it('в пустом массиве', () => {
      array = [];
      sortedArray = sortWithSelection({ array, direction: Direction.Ascending });
      expect(sortedArray).toEqual([]);
    });
    it('в массиве из одного элемента ', () => {
      array = [{
        id: '1',
        value: 1,
        state: ElementStates.Default
      }];
      expectedArray = [
        {
          id: '1',
          value: 1,
          state: ElementStates.Modified
        }
      ];
      sortedArray = sortWithSelection({ array, direction: Direction.Ascending });
      expect(sortedArray[sortedArray.length - 1]).toEqual(expectedArray);
    });
    it('в массиве из нескольких элементов', () => {
      array = [
        {
          id: '3',
          value: 11,
          state: ElementStates.Default
        },
        {
          id: '1',
          value: 1,
          state: ElementStates.Default
        },
        {
          id: '4',
          value: 131,
          state: ElementStates.Default
        },
        {
          id: '2',
          value: 3,
          state: ElementStates.Default
        }
      ];
      expectedArray = [
        {
          id: '1',
          value: 1,
          state: ElementStates.Modified
        },
        {
          id: '2',
          value: 3,
          state: ElementStates.Modified
        },
        {
          id: '3',
          value: 11,
          state: ElementStates.Modified
        },
        {
          id: '4',
          value: 131,
          state: ElementStates.Modified
        }
      ];
      sortedArray = sortWithSelection({ array, direction: Direction.Ascending });
      expect(sortedArray[sortedArray.length - 1]).toEqual(expectedArray);
    });
  });
  describe('пузырьком', () => {
    it('в пустом массиве', () => {
      array = [];
      sortedArray = sortWithBubble({ array, direction: Direction.Ascending });
      expect(sortedArray).toEqual([]);
    });
    it('в массиве из одного элемента ', () => {
      array = [{
        id: '1',
        value: 1,
        state: ElementStates.Default
      }];
      expectedArray = [
        {
          id: '1',
          value: 1,
          state: ElementStates.Modified
        }
      ];
      const sortedArray = sortWithBubble({ array, direction: Direction.Ascending });
      expect(sortedArray[sortedArray.length - 1]).toEqual(expectedArray);
    });
    it('в массиве из нескольких элементов', () => {
      array = [
        {
          id: '3',
          value: 11,
          state: ElementStates.Default
        },
        {
          id: '1',
          value: 1,
          state: ElementStates.Default
        },
        {
          id: '2',
          value: 3,
          state: ElementStates.Default
        }
      ];
      expectedArray = [
        {
          id: '1',
          value: 1,
          state: ElementStates.Modified
        },
        {
          id: '2',
          value: 3,
          state: ElementStates.Modified
        },
        {
          id: '3',
          value: 11,
          state: ElementStates.Modified
        },
      ];
      const sortedArray = sortWithBubble({ array, direction: Direction.Ascending });
      expect(sortedArray[sortedArray.length - 1]).toEqual(expectedArray);
    });
  });
});
