import { Direction, SortElement, SortOptions } from '../../../types/sort';
import { ElementStates } from '../../../types/element-states';
import { swap } from '../../../helpers/swap';
import { changeColor } from './changeColor';

export const sortWithBubble = ({
                                 array,
                                 direction
                               }: Omit<SortOptions, 'type'>): SortElement[][] => {
  let copyArray: SortElement[] = [...array];
  let arraySortingMap: SortElement[][] = [];
  for (let j = copyArray!.length - 1; j >= 0; j--) {
    for (let i = 0; i < j; i++) {
      copyArray[i] = changeColor(copyArray[i], ElementStates.Changing);
      copyArray[i + 1] = changeColor(copyArray[i + 1], ElementStates.Changing);
      arraySortingMap.push([...copyArray]);
      if (direction === Direction.Descending && copyArray[i].value < copyArray[i + 1].value) {
        swap(copyArray, i, i + 1);
        arraySortingMap.push([...copyArray]);
      }
      if (direction === Direction.Ascending && copyArray[i].value > copyArray[i + 1].value) {
        swap(copyArray, i, i + 1);
        arraySortingMap.push([...copyArray]);
      }
      copyArray[i] = changeColor(copyArray[i], ElementStates.Default);
      copyArray[i + 1] = changeColor(copyArray[i + 1], ElementStates.Default);
      arraySortingMap.push([...copyArray]);
    }
    copyArray[j] = changeColor(copyArray[j], ElementStates.Modified);
    arraySortingMap.push([...copyArray]);
  }
  return arraySortingMap;
};
