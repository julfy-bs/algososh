import { SortElement, SortOptions, Type } from '../../../types/sort';
import { sortWithSelection } from './sortWithSelection';
import { sortWithBubble } from './sortWithBubble';
import { sleep } from '../../../helpers/sleep';
import { Dispatch, SetStateAction } from 'react';

export const startSorting = async (
  sortOptions: SortOptions,
  setIsSortInProgress: Dispatch<SetStateAction<boolean>>,
  setSortArray: Dispatch<SetStateAction<SortElement[]>>
) => {
  setIsSortInProgress(true);
  let index = 0;
  let arraySortingMap: SortElement[][];

  (sortOptions.type === Type.Selection)
    ? arraySortingMap = sortWithSelection(sortOptions)
    : arraySortingMap = sortWithBubble(sortOptions);

  while (index < arraySortingMap.length) {
    setSortArray(arraySortingMap[index]);
    await sleep(400);
    index++;
  }
  setIsSortInProgress(false);
};
