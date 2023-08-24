import { nanoid } from 'nanoid';
import { ElementStates } from '../../../types/element-states';
import { SortElement } from '../../../types/sort';

type Options = {
  minLength?: number;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
}

const createRandomArray = ({
                             minLength = 3,
                             maxLength = 17,
                             minValue = 0,
                             maxValue = 100
                           }: Options = {}): SortElement[] => {
  const array = [];
  const randomLength = Math.round(Math.random() * (maxLength - minLength) + minLength);
  for (let i = 0; i < randomLength; i++) {
    const randomValue = Math.round(Math.random() * (maxValue - minValue) + minValue);
    const element: SortElement = {
      id: nanoid(),
      value: randomValue,
      state: ElementStates.Default
    };
    array.push(element);
  }
  return array;
};

export { createRandomArray };
