import { createFibonacciArray } from './createFibonacciArray';
import { sleep } from '../../../helpers/sleep';
import { Dispatch, SetStateAction } from 'react';

export const startFibonacciAlgorithm = async (
  n: number,
  setValuesArray: Dispatch<SetStateAction<number[]>>,
  setValueIndex: Dispatch<SetStateAction<number>>,
) => {
  const fibonacciArray = createFibonacciArray(n);
  setValuesArray(fibonacciArray);
  setValueIndex(0);
  let i = 0;
  while (i <= n) {
    setValueIndex(i);
    await sleep(1000);
    i++;
  }
};
