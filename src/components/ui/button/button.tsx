import { FC, HTMLProps } from 'react';
import styles from './button.module.css';
import loaderIcon from '../../../images/icons/loader.svg';
import { AscendingIcon } from '../icons/ascending-icon';
import { DescendingIcon } from '../icons/descending-icon';
import { Direction } from '../../../types/sort';
import { clsx } from 'clsx';

type ButtonProps = {
  text?: string;
  type?: 'button' | 'submit' | 'reset';
  sorting?: Direction;
  linkedList?: 'small' | 'big';
  isLoader?: boolean;
  extraClass?: string;
} & HTMLProps<HTMLButtonElement>

export const Button: FC<ButtonProps> = ({
  text,
  extraClass = '',
  type = 'button',
  isLoader = false,
  sorting,
  linkedList,
  disabled,
  ...rest
}) => {
  const currentIcon =
    sorting === Direction.Ascending
      ? <AscendingIcon />
      : <DescendingIcon />;

  const className = clsx(
    'text',
    'text_type_button',
    'text_color_primary',
    styles.button,
    extraClass,
    {
      [styles.loader]: isLoader,
      [styles.small]: linkedList === 'small',
      [styles.big]: linkedList === 'big',
    });

  return (
    <button
      className={ className }
      type={ type }
      disabled={ isLoader || disabled }
      { ...rest }
    >
      { isLoader
        ? (
          <img
            className={ clsx(styles.loader_icon) }
            src={ loaderIcon }
            alt="Загрузка."
          />
        )
        : (
          <>
            { sorting && currentIcon }
            <p className={ clsx(text, { ['ml-5']: sorting }) }>{ text }</p>
          </>
        ) }
    </button>
  );
};
