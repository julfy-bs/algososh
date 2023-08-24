export type LinkedListState =
  LinkedListStateVariety.AddToHead
  | LinkedListStateVariety.AddToTail
  | LinkedListStateVariety.AddByIndex
  | LinkedListStateVariety.DeleteFromHead
  | LinkedListStateVariety.DeleteFromTail
  | LinkedListStateVariety.DeleteByIndex
  | LinkedListStateVariety.Empty
  | LinkedListStateVariety.Success

export enum LinkedListStateVariety {
  AddToHead = 'addToHead',
  AddToTail = 'addToTail',
  AddByIndex = 'addByIndex',
  DeleteFromHead = 'deleteFromHead',
  DeleteFromTail = 'deleteFromTail',
  DeleteByIndex = 'deleteFromIndex',
  Empty = 'null',
  Success = 'success'
}
