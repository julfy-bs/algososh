import { nanoid } from 'nanoid';
import { ElementStates } from '../../../types/element-states';
import { SortElement } from '../../../types/sort';
import {
  RANDOM_ARRAY_MAX_LENGTH, RANDOM_ARRAY_MAX_VALUE,
  RANDOM_ARRAY_MIN_LENGTH,
  RANDOM_ARRAY_MIN_VALUE
} from '../../../constants/algorithmsRules';

type Options = {
  minLength?: number;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
}

const createRandomArray = ({
  minLength = RANDOM_ARRAY_MIN_LENGTH,
  maxLength = RANDOM_ARRAY_MAX_LENGTH,
  minValue = RANDOM_ARRAY_MIN_VALUE,
  maxValue = RANDOM_ARRAY_MAX_VALUE
}: Options = {}): SortElement[] => {
  if (minLength > maxLength) maxLength = minLength;
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
