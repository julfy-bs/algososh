import React from 'react';
import styles from './return-button.module.css';
import { ReturnIcon } from '../icons/return-icon';
import { LINK_HOMEPAGE_TEST_ID } from '../../../constants/tests/routes';

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  extraClass?: string;
}

export const ReturnButton: React.FC<ButtonProps> = ({
  extraClass = '',
  ...rest
}) => {
  return (
    <button
      data-test-id={ LINK_HOMEPAGE_TEST_ID }
      className={ `${ styles.button } ${ extraClass }` }
      type="button"
      { ...rest }
    >
      <ReturnIcon />
      <p className="text text_type_button text_color_link ml-4">К оглавлению</p>
    </button>
  );
};
