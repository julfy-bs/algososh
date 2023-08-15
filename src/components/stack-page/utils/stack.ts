import { Dispatch, SetStateAction } from 'react';
import { sleep } from '../../../helpers/sleep';

type StackClass<T> = {
  push: (
    value: T,
    setValue: Dispatch<SetStateAction<string>>,
    valuesArray: T[],
    setValuesArray: Dispatch<SetStateAction<T[]>>,
    setIsFormSubmitting:  Dispatch<SetStateAction<boolean>>,
    setIsValueAdding:  Dispatch<SetStateAction<boolean>>,
    cooldown: number
  ) => Promise<void>
  pop: (
    valuesArray: T[],
    setValuesArray: Dispatch<SetStateAction<T[]>>,
    setIsFormSubmitting:  Dispatch<SetStateAction<boolean>>,
    setIsValueDeleting:  Dispatch<SetStateAction<boolean>>,
    cooldown: number
  ) => Promise<void>
  clear: (
    setValuesArray: Dispatch<SetStateAction<T[]>>,
    setIsFormSubmitting:  Dispatch<SetStateAction<boolean>>,
    setIsValueArrayClearing:  Dispatch<SetStateAction<boolean>>,
    cooldown: number
  ) => Promise<void>
}

export class Stack<T> implements StackClass<T> {
  private stackArray: T[] = [];

  async push(
    value: T,
    setValue: Dispatch<SetStateAction<string>>,
    valuesArray: T[],
    setValuesArray: Dispatch<SetStateAction<T[]>>,
    setIsFormSubmitting:  Dispatch<SetStateAction<boolean>>,
    setIsValueAdding:  Dispatch<SetStateAction<boolean>>,
    cooldown: number
  ) {
    setIsFormSubmitting(true);
    setIsValueAdding(true);
    this.stackArray = [...valuesArray];
    this.stackArray.push(value);
    setValuesArray(this.stackArray);
    setValue('');
    await sleep(cooldown);
    setIsValueAdding(false);
    setIsFormSubmitting(false);
  }
  async pop(
    valuesArray: T[],
    setValuesArray: Dispatch<SetStateAction<T[]>>,
    setIsFormSubmitting:  Dispatch<SetStateAction<boolean>>,
    setIsValueDeleting:  Dispatch<SetStateAction<boolean>>,
    cooldown: number
  ) {
    setIsFormSubmitting(true);
    setIsValueDeleting(true);
    await sleep(cooldown);
    this.stackArray = [...valuesArray];
    this.stackArray.pop();
    setValuesArray(this.stackArray);
    setIsValueDeleting(false);
    setIsFormSubmitting(false);
  }
  async clear(
    setValuesArray: Dispatch<SetStateAction<T[]>>,
    setIsFormSubmitting:  Dispatch<SetStateAction<boolean>>,
    setIsValueArrayClearing:  Dispatch<SetStateAction<boolean>>,
    cooldown: number
  ) {
    setIsFormSubmitting(true);
    setIsValueArrayClearing(true);
    await sleep(cooldown);
    this.stackArray = [];
    setValuesArray(this.stackArray);
    setIsValueArrayClearing(false);
    setIsFormSubmitting(false);
  }
}
