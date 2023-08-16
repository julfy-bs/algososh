import React, { ChangeEventHandler, FormEventHandler, ReactEventHandler, useEffect, useMemo, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './queue-page.module.css';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Queue } from './utils/queue';
import { Circle } from '../ui/circle/circle';
import { nanoid } from 'nanoid';
import { ElementStates, ElementStatesVariety } from '../../types/element-states';
import { QueueSettings } from '../../types/queue';
import { SolutionState, SolutionStateVariety } from '../../types/solution';
import { sleep } from '../../helpers/sleep';

export const QueuePage = () => {
  const [value, setValue] = useState<string>('');
  const [queueSettings, setQueueSettings] = useState<QueueSettings>({
    array: [],
    head: 0,
    tail: 0
  });
  const [queueSize] = useState<number>(7);
  const [solutionState, setSolutionState] = useState<SolutionState>(SolutionStateVariety.Empty);
  const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false);
  const queue = useMemo(() => new Queue(queueSize), []);

  useEffect(() => {
    setQueueSettings({
      ...queueSettings,
      array: queue.getElements()
    });
  }, []);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e): void => {
    setValue(e.currentTarget.value);
  };

  const handleAddToStack: FormEventHandler<HTMLFormElement> = async (e): Promise<void> => {
    e.preventDefault();
    setIsFormSubmitting(true);
    setSolutionState(SolutionStateVariety.Add);
    const options = await queue.enqueue(value);
    setValue('');
    setQueueSettings(options);
    await sleep(1000);
    setSolutionState(SolutionStateVariety.Empty);
    setIsFormSubmitting(false);
  };

  const handleDeleteFromStack: ReactEventHandler<HTMLButtonElement> = async (): Promise<void> => {
    setIsFormSubmitting(true);
    setSolutionState(SolutionStateVariety.Delete);
    await sleep(1000);
    const options = await queue.dequeue();
    setQueueSettings(options);
    setSolutionState(SolutionStateVariety.Empty);
    setIsFormSubmitting(false);
  };

  const handleClearValuesArray: ReactEventHandler<HTMLButtonElement> = async (): Promise<void> => {
    setIsFormSubmitting(true);
    setSolutionState(SolutionStateVariety.Clear);
    await sleep(1000);
    const options = await queue.clear();
    setQueueSettings(options);
    setSolutionState(SolutionStateVariety.Empty);
    setIsFormSubmitting(false);
  };

  const findState = (item: string, index: number): ElementStatesVariety => {
    if (solutionState === SolutionStateVariety.Add && index === queueSettings.tail - 1) {
      return ElementStates.Changing;
    }
    if (solutionState === SolutionStateVariety.Delete && index === queueSettings.head) {
      return ElementStates.Changing;
    }
    if (solutionState === SolutionStateVariety.Clear && item) {
      return ElementStates.Changing;
    }
    return ElementStates.Default;
  };

  return (
    <SolutionLayout title="Очередь">
      <form className={ styles.form } onSubmit={ handleAddToStack }>
        <fieldset className={ `${ styles.form_fieldset } ${ styles.form_fieldset_type_input }` }>
          <Input
            disabled={ isFormSubmitting || queueSize === queue.getLength() }
            value={ value }
            maxLength={ 4 }
            onChange={ handleChange }
            tabIndex={ 0 }
          />
        </fieldset>
        <fieldset className={ `${ styles.form_fieldset } ${ styles.form_fieldset_type_button }` }>
          <Button
            disabled={ isFormSubmitting || !value || queueSize === queue.getLength() }
            isLoader={ solutionState === SolutionStateVariety.Add }
            type={ 'submit' }
            text={ 'Добавить' }
            extraClass={ `${ styles.form_button } mr-3` }
          />
          <Button
            disabled={ queue.getLength() === 0 }
            isLoader={ solutionState === SolutionStateVariety.Delete }
            type={ 'button' }
            text={ 'Удалить' }
            extraClass={ styles.form_button }
            onClick={ handleDeleteFromStack }
          />
          <Button
            disabled={ queue.getLength() === 0 }
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
          queueSettings.array.map(
            (item, index) => (
              <Circle
                state={ findState(item, index) }
                letter={ item }
                index={ index }
                key={ nanoid() }
                head={ item && queueSettings.head === index
                  ? 'head'
                  : '' }
                tail={ item && queueSettings.tail - 1 === index
                  ? 'tail'
                  : '' }
              />
            ))
        }
      </div>
    </SolutionLayout>
  );
};
