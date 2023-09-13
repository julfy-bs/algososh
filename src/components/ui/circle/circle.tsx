import { FC, ReactElement } from 'react';
import { ElementStates } from '../../../types/element-states';
import styles from './circle.module.css';
import { CircleClassNames } from './utils/circle-class-names';

type CircleProps = {
  state?: ElementStates;
  letter?: string;
  head?: string | ReactElement | null;
  index?: number;
  tail?: string | ReactElement | null;
  tailType?: 'string' | 'element';
  extraClass?: string;
  isSmall?: boolean;
}

export const Circle: FC<CircleProps> = ({
  state = ElementStates.Default,
  letter,
  head,
  index,
  tail,
  extraClass = '',
  isSmall,
}) => {
  return (
    <div className={ `${ styles[CircleClassNames.Content] } ${ extraClass }` }>
      <div
        className={ `
          text
          text_type_input
          text_color_input
          mb-4
          ${ styles.absolute }
          ${ styles[CircleClassNames.Head] } 
          ${ styles[typeof head === 'string' ? 'string' : 'element'] }
        ` }
      >
        { head }
      </div>
      <div
        className={ `${ styles[CircleClassNames.Circle] }  ${ isSmall ? styles.small : '' } ${
          styles[state]
        }` }
      >
        <p
          className={ `text text_type_circle text_color_input ${ styles[CircleClassNames.Letter] }` }
        >
          { letter }
        </p>
      </div>
      <p
        className={ `text text_type_input text_color_input mt-4 ${ styles.absolute } ${ styles[CircleClassNames.Index] }` }
      >
        { index?.toString() }
      </p>
      <div
        className={ `
          text
          text_type_input
          text_color_input
          mt-4 
          ${ styles.absolute }
          ${ index?.toString() ? styles.tail60 : styles.tail30 } 
          ${ styles[typeof tail === 'string' ? 'string' : 'element'] }
        ` }
      >
        { tail }
      </div>
    </div>
  );
};
