import { HTMLProps } from 'react';
import { nanoid } from 'nanoid';
import styles from './radio-input.module.css';

type RadioProps = {
  label: string;
  extraClass?: string;
};

export const RadioInput = ({
                             label = 'Введите текст',
                             extraClass = '',
                             ...rest
                           }: RadioProps & HTMLProps<HTMLInputElement>) => {
  const id = nanoid();

  return (
    <div className={ `${ styles.content } ${ extraClass }` }>
      <input className={ styles.input } type="radio" id={ id } { ...rest } />
      <label className={ `text text_type_button ${ styles.label }` } htmlFor={ id }>
        { label }
      </label>
    </div>
  );
};
