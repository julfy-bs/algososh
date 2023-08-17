import { StackSettings } from '../../../types/stack';

type StackClass<T> = {
  push: (value: T) => StackSettings<T>;
  pop: () => StackSettings<T>;
  clear: () => StackSettings<T>;
}

export class Stack<T> implements StackClass<T> {
  private stackArray: T[] = [];

  push(value: T): StackSettings<T> {
    this.stackArray.push(value);
    return this.returnStackData();
  }

  pop(): StackSettings<T> {
    this.stackArray.pop();
    return this.returnStackData();
  }

  clear(): StackSettings<T> {
    this.stackArray = [];
    return this.returnStackData();
  }

  private returnStackData(): StackSettings<T> {
    return {
      array: this.stackArray
    };
  }
}
