import { Direction, SortElement, SortOptions } from '../../../types/sort';
import { ElementStates } from '../../../types/element-states';
import { swap } from '../../../helpers/swap';
import { changeColor } from './changeColor';

export const sortWithSelection = ({
                                    array,
                                    direction
                                  }: Omit<SortOptions, 'type'>): SortElement[][] => {
  let copyArray: SortElement[] = [...array];
  let arraySortingMap: SortElement[][] = [];
  const { length } = copyArray;
  for (let i = 0; i < length; i++) {
    let target = i;
    for (let j = i + 1; j < length; j++) {
      copyArray[target] = changeColor(copyArray[target], ElementStates.Changing);
      copyArray[j] = changeColor(copyArray[j], ElementStates.Changing);
      arraySortingMap.push([...copyArray]);
      if (direction === Direction.Descending && copyArray[j].value > copyArray[target].value) {
        swap(copyArray, target, j);
        arraySortingMap.push([...copyArray]);
      }
      if (direction === Direction.Ascending && copyArray[j].value < copyArray[target].value) {
        swap(copyArray, target, j);
        arraySortingMap.push([...copyArray]);
      }
      copyArray[target] = changeColor(copyArray[target], ElementStates.Default);
      copyArray[j] = changeColor(copyArray[j], ElementStates.Default);
      arraySortingMap.push([...copyArray]);
    }
    copyArray[target] = changeColor(copyArray[target], ElementStates.Modified);
    arraySortingMap.push([...copyArray]);
  }
  return arraySortingMap;
};
