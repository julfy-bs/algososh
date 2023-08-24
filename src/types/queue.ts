export type QueueSettings<T> = {
  array: (T | string)[];
  head: number;
  tail: number;
}
