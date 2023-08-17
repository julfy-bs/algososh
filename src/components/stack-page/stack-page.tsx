import React, { ChangeEventHandler, FormEventHandler, ReactEventHandler, useMemo, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';
import { Circle } from '../ui/circle/circle';
import { nanoid } from 'nanoid';

import styles from './stack-page.module.css';
import { ElementStates, ElementStatesVariety } from '../../types/element-states';
import { Stack } from './utils/stack';
import { SolutionState, SolutionStateVariety } from '../../types/solution';
import { StackSettings } from '../../types/stack';
import { sleep } from '../../helpers/sleep';

export const StackPage = () => {
  const [value, setValue] = useState<string>('');
  const [stackSettings, setStackSettings] = useState<StackSettings<string>>({
    array: [],
  });
  const [solutionState, setSolutionState] = useState<SolutionState>(SolutionStateVariety.Empty);
  const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false);
  const isCircleVisible = useMemo(() => {
    return stackSettings.array.length > 0;
  }, [stackSettings.array]);
  const stack = React.useMemo(() => new Stack<string>(), []);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.currentTarget.value);
  };

  const handleAddToStack: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsFormSubmitting(true);
    setSolutionState(SolutionStateVariety.Add);
    const options: StackSettings<string> = stack.push(value);
    setStackSettings(options);
    await sleep(1000);
    setValue('');
    setSolutionState(SolutionStateVariety.Empty);
    setIsFormSubmitting(false);
  };

  const handleDeleteFromStack: ReactEventHandler<HTMLButtonElement> = async () => {
    setIsFormSubmitting(true);
    setSolutionState(SolutionStateVariety.Delete);
    await sleep(1000);
    const options = stack.pop();
    setStackSettings(options);
    setSolutionState(SolutionStateVariety.Empty);
    setIsFormSubmitting(false);
  };

  const handleClearValuesArray: ReactEventHandler<HTMLButtonElement> = async () => {
    setIsFormSubmitting(true);
    setSolutionState(SolutionStateVariety.Clear);
    await sleep(1000);
    const options = stack.clear();
    setStackSettings(options);
    setSolutionState(SolutionStateVariety.Empty);
    setIsFormSubmitting(false);
  };

  const findState = (item: string, index: number): ElementStatesVariety => {
    if (solutionState === SolutionStateVariety.Clear) {
      return ElementStates.Changing;
    }
    if (((solutionState === SolutionStateVariety.Add
        || solutionState === SolutionStateVariety.Delete)
      && index === stackSettings.array.length - 1)) {
      return ElementStates.Changing;
    }
    return ElementStates.Default;
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
            isLoader={ solutionState === SolutionStateVariety.Add }
            type={ 'submit' }
            text={ 'Добавить' }
            extraClass={ `${ styles.form_button } mr-3` }
          />
          <Button
            disabled={ !isCircleVisible }
            isLoader={ solutionState === SolutionStateVariety.Delete }
            type={ 'button' }
            text={ 'Удалить' }
            extraClass={ styles.form_button }
            onClick={ handleDeleteFromStack }
          />
          <Button
            disabled={ !isCircleVisible }
            isLoader={ solutionState === SolutionStateVariety.Clear }
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
            ? stackSettings.array.map((item, index) => (
              <Circle
                key={ nanoid() }
                state={ findState(item, index) }
                letter={ item }
                index={ index }
                head={ stackSettings.array.length - 1 === index
                  ? 'top'
                  : '' }/>
            ))
            : <></>
        }
      </div>
    </SolutionLayout>
  );
};
