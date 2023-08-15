import React, { ChangeEventHandler, FormEventHandler, ReactEventHandler, useMemo, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';
import { Circle } from '../ui/circle/circle';
import { nanoid } from 'nanoid';

import styles from './stack-page.module.css';
import { ElementStates } from '../../types/element-states';
import { Stack } from './utils/stack';

export const StackPage = () => {
  const [value, setValue] = useState<string>('');
  const [valuesArray, setValuesArray] = useState<string[]>([]);

  const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false);
  const [isValueAdding, setIsValueAdding] = useState<boolean>(false);
  const [isValueDeleting, setIsValueDeleting] = useState<boolean>(false);
  const [isValueArrayClearing, setIsValueArrayClearing] = useState<boolean>(false);

  const isCircleVisible = useMemo(() => {
    return valuesArray.length > 0;
  }, [valuesArray]);
  const stack = React.useMemo(() => new Stack<string>(), []);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.currentTarget.value);
  };

  const handleAddToStack: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await stack.push(value, setValue, valuesArray, setValuesArray, setIsFormSubmitting, setIsValueAdding, 1000);
  };

  const handleDeleteFromStack: ReactEventHandler<HTMLButtonElement> = async () => {
    await stack.pop(valuesArray, setValuesArray, setIsFormSubmitting, setIsValueDeleting, 1000);
  };

  const handleClearValuesArray: ReactEventHandler<HTMLButtonElement> = async () => {
    await stack.clear(setValuesArray, setIsFormSubmitting, setIsValueArrayClearing, 1000);
  };


  return (
    <SolutionLayout title="Стек">
      <form className={ styles.form } onSubmit={ handleAddToStack }>
        <fieldset className={ `${ styles.form_fieldset } ${ styles.form_fieldset_type_input }` }>
          <Input
            disabled={ isFormSubmitting }
            value={ value }
            maxLength={ 4 }
            onChange={ handleChange }
          />
        </fieldset>
        <fieldset className={ `${ styles.form_fieldset } ${ styles.form_fieldset_type_button }` }>
          <Button
            disabled={ !value }
            isLoader={ isValueAdding }
            type={ 'submit' }
            text={ 'Добавить' }
            extraClass={ `${ styles.form_button } mr-3` }
          />
          <Button
            disabled={ !isCircleVisible }
            isLoader={ isValueDeleting }
            type={ 'button' }
            text={ 'Удалить' }
            extraClass={ styles.form_button }
            onClick={ handleDeleteFromStack }
          />
          <Button
            disabled={ !isCircleVisible }
            isLoader={ isValueArrayClearing }
            type={ 'button' }
            text={ 'Очистить' }
            extraClass={ styles.form_button }
            onClick={ handleClearValuesArray }
          />
        </fieldset>
      </form>
      <div className={ styles.wrapper }>
        {
          isCircleVisible
            ? valuesArray.map((item, index) => (
              <Circle
                key={ nanoid() }
                state={
                  isValueArrayClearing
                    ? ElementStates.Changing
                    : ElementStates.Default
                    &&
                    ((isValueAdding || isValueDeleting) && index === valuesArray.length - 1
                      ? ElementStates.Changing
                      : ElementStates.Default)
                }
                letter={ item }
                index={ index }
                head={ valuesArray.length - 1 === index
                  ? 'top'
                  : '' }/>
            ))
            : <></>
        }
      </div>
    </SolutionLayout>
  );
};
