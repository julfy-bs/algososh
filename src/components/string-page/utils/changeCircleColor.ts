import { ElementStates } from '../../../types/element-states';

export const changeCircleColor =
  (startIndex: number, endIndex: number, index: number): ElementStates => {
    if (startIndex === index) return ElementStates.Changing;
    if (endIndex === index) return ElementStates.Changing;
    if (startIndex > index) return ElementStates.Modified;
    if (endIndex < index) return ElementStates.Modified;
    if (startIndex === endIndex) return ElementStates.Modified;
    return ElementStates.Default;
  };
