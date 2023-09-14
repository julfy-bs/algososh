import { CircleClassNames } from '../../components/ui/circle/utils/circle-class-names';
import { ElementStates } from '../../types/element-states';

export const Element = `[class*=circle_${ CircleClassNames.Content }]`;
export const Circle = `[class*=circle_${ CircleClassNames.Circle }]`;
export const ElementChanging = `[class*=circle_${ ElementStates.Changing }]`;
export const ElementDefault = `[class*=circle_${ ElementStates.Default }]`;

