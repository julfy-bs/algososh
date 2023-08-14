import { sleep } from '../../../helpers/sleep';
import { swap } from '../../../helpers/swap';
import { Dispatch, SetStateAction } from 'react';

export const reverseString = async (
  setIsFormSubmitted: Dispatch<SetStateAction<boolean>>,
  setIsCircleVisible: Dispatch<SetStateAction<boolean>>,
  setPointerFirst: Dispatch<SetStateAction<number>>,
  setPointerSecond: Dispatch<SetStateAction<number>>,
  valuesArray: string[],
  setValuesArray: Dispatch<SetStateAction<string[]>>
) => {
  setIsFormSubmitted(true);
  setIsCircleVisible(true);
  let start = 0;
  let end = valuesArray.length - 1;
  while (start < end) {
    setPointerFirst(start);
    setPointerSecond(end);
    await sleep(1000);
    swap(valuesArray, start, end);
    setValuesArray(valuesArray);
    start++;
    end--;
  }
  setPointerFirst(valuesArray.length);
  setPointerSecond(valuesArray.length);
  setIsFormSubmitted(false);
};
