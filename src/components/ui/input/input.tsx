import { HTMLProps } from 'react';
import styles from './input.module.css';

type InputProps = {
  placeholder?: string;
  extraClass?: string;
  isLimitText?: boolean;
}

export const Input = ({
                        placeholder = 'Введите текст',
                        extraClass = '',
                        type = 'text',
                        maxLength,
                        max,
                        isLimitText = false,
                        ...rest
                      }: InputProps & HTMLProps<HTMLInputElement>) => {

  return (
    <div className={ `${ styles.content } ${ extraClass }` }>
      <input
        className={ `${ styles.input } text text_type_input text_color_input` }
        placeholder={ placeholder }
        type={ type }
        maxLength={ maxLength }
        max={ max }
        { ...rest }
      />
      {
        maxLength && (
          <span
            className={ `text text_type_input-lim text_color_input mt-2 ml-8 ${ styles.limit }` }
          >
            { `Максимум — ${ maxLength } символов` }
          </span>
        )
      }
      {
        max && (
          <span
            className={ `text text_type_input-lim text_color_input mt-2 ml-8 ${ styles.limit }` }
          >
            { `Максимальное число — ${ max }` }
          </span>
        )
      }
    </div>
  );
};
