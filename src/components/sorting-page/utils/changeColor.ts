import { SortElement } from '../../../types/sort';
import { ElementStatesVariety } from '../../../types/element-states';

export const changeColor = (element: SortElement, color: ElementStatesVariety): SortElement => {
  return {
    ...element,
    state: color
  };
};
