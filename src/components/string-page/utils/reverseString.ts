import { Dispatch, SetStateAction } from 'react';
import { sleep } from '../../../helpers/sleep';
import { swap } from '../../../helpers/swap';

export const reverseString = async (
  valuesArray: string[],
  setValuesArray: Dispatch<SetStateAction<string[]>>,
  setPointerFirst: Dispatch<SetStateAction<number>>,
  setPointerSecond: Dispatch<SetStateAction<number>>,
  delay: number = 0
) => {
  let start = 0;
  let end = valuesArray.length - 1;
  while (start <= end) {
    setPointerFirst(start);
    setPointerSecond(end);
    await sleep(delay);
    swap(valuesArray, start, end);
    setValuesArray(valuesArray);
    start++;
    end--;
  }
};
