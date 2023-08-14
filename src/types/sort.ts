import { ElementStatesVariety } from './element-states';

export enum Type {
  Bubble = 'bubble',
  Selection = 'selection',
}

export enum Direction {
  Ascending = "ascending",
  Descending = "descending",
}

export type SortType = Type.Bubble | Type.Selection;
export type SortDirection = Direction.Ascending | Direction.Descending;


export type SortElement = {
  readonly id: string;
  value: number;
  state: ElementStatesVariety;
}
