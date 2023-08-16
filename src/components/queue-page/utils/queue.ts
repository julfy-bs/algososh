import { QueueSettings } from '../../../types/queue';

type QueueClass = {
  enqueue: (value: string) => QueueSettings;
  dequeue: () => QueueSettings;
  clear: () => QueueSettings;
  getElements: () => Array<string>;
  getLength: () => number;
}

export class Queue implements QueueClass {
  private queueArray: (string)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.queueArray = this.createInitialArray(size);
  }

  enqueue(value: string): QueueSettings {
    if (this.length === this.size) this.returnQueueData();
    if (this.tail === this.size) this.tail = 0;
    this.queueArray[this.tail] = value;
    this.length++;
    this.tail++;
    return this.returnQueueData();
  }

  dequeue(): QueueSettings {
    if (this.length === 0) this.returnQueueData();
    this.queueArray[this.head % this.size] = '';
    this.length--;
    this.head++;
    if (this.head === this.size) this.head = 0;
    return this.returnQueueData();
  }

  clear(): QueueSettings {
    this.queueArray = this.createInitialArray(this.size);
    this.length = 0;
    this.head = 0;
    this.tail = 0;
    return this.returnQueueData();
  }

  getElements(): Array<string> {
    return this.queueArray;
  };

  getLength(): number {
    return this.length;
  };

  private returnQueueData(): QueueSettings {
    return {
      array: this.queueArray,
      head: this.head,
      tail: this.tail
    };
  }

  private createInitialArray(size: number): string[] {
    const array: string[] = [];
    for (let i = 0; i < size; i++) {
      array.push('');
    }
    return array;
  }
}
