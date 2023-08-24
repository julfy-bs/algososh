export type SolutionState =
  SolutionStateVariety.Add
  | SolutionStateVariety.Delete
  | SolutionStateVariety.Clear
  | SolutionStateVariety.Empty

export enum SolutionStateVariety {
  Add = 'add',
  Delete = 'delete',
  Clear = 'clear',
  Empty = 'null'
}
