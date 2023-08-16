import { StackSettings } from '../../../types/stack';

type StackClass = {
  push: (value: string) => StackSettings;
  pop: () => StackSettings;
  clear: () => StackSettings;
}

export class Stack implements StackClass {
  private stackArray: string[] = [];

  push(value: string): StackSettings {
    this.stackArray.push(value);
    return this.returnStackData();
  }

  pop(): StackSettings {
    this.stackArray.pop();
    return this.returnStackData();
  }

  clear(): StackSettings {
    this.stackArray = [];
    return this.returnStackData();
  }

  private returnStackData(): StackSettings {
    return {
      array: this.stackArray
    };
  }
}
