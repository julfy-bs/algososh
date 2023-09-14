import { ChangeEventHandler, FormEventHandler, ReactEventHandler, useEffect, useMemo, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { sleep } from '../../helpers/sleep';
import { Queue } from './utils/queue';
import { ElementStates, ElementStatesVariety } from '../../types/element-states';
import { QueueSettings } from '../../types/queue';
import { SolutionState, SolutionStateVariety } from '../../types/solution';
import styles from './queue-page.module.css';
import { DELAY_IN_MS } from '../../constants/delays';
import { INPUT_MAX_LENGTH_QUEUE, ARRAY_DEFAULT_SIZE_QUEUE } from '../../constants/algorithms-rules';
import { HEAD, TAIL } from '../../constants/element-captions';
import {
  BUTTON_ADD_TEST_ID,
  BUTTON_CLEAR_TEST_ID,
  BUTTON_REMOVE_TEST_ID,
  INPUT_TEST_ID
} from '../../constants/tests/queue';

export const QueuePage = () => {
  const [value, setValue] = useState<string>('');
  const [queueSettings, setQueueSettings] = useState<QueueSettings<string>>({
    array: [],
    head: 0,
    tail: 0
  });
  const [queueSize] = useState<number>(ARRAY_DEFAULT_SIZE_QUEUE);
  const [solutionState, setSolutionState] = useState<SolutionState>(SolutionStateVariety.Empty);
  const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false);
  const queue = useMemo(() => new Queue<string>(queueSize), [queueSize]);

  useEffect(() => {
    setQueueSettings({
      ...queueSettings,
      array: queue.getElements()
    });
  }, []);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e): void => {
    setValue(e.currentTarget.value);
  };

  const handleAddToQueue: FormEventHandler<HTMLFormElement> = async (e): Promise<void> => {
    e.preventDefault();
    setIsFormSubmitting(true);
    setSolutionState(SolutionStateVariety.Add);
    const options = await queue.enqueue(value);
    setValue('');
    setQueueSettings(options);
    await sleep(DELAY_IN_MS);
    setSolutionState(SolutionStateVariety.Empty);
    setIsFormSubmitting(false);
  };

  const handleDeleteFromQueue: ReactEventHandler<HTMLButtonElement> = async (): Promise<void> => {
    setIsFormSubmitting(true);
    setSolutionState(SolutionStateVariety.Delete);
    await sleep(DELAY_IN_MS);
    const options = await queue.dequeue();
    setQueueSettings(options);
    setSolutionState(SolutionStateVariety.Empty);
    setIsFormSubmitting(false);
  };

  const handleClearValuesArray: ReactEventHandler<HTMLButtonElement> = async (): Promise<void> => {
    setIsFormSubmitting(true);
    setSolutionState(SolutionStateVariety.Clear);
    await sleep(DELAY_IN_MS);
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
      <form
        className={ styles.form }
        onSubmit={ handleAddToQueue }
      >
        <fieldset className={ `${ styles.form_fieldset } ${ styles.form_fieldset_type_input }` }>
          <Input
            data-test-id={ INPUT_TEST_ID }
            disabled={ isFormSubmitting || queueSize === queue.getLength() }
            value={ value }
            maxLength={ INPUT_MAX_LENGTH_QUEUE }
            onChange={ handleChange }
          />
        </fieldset>
        <fieldset className={ `${ styles.form_fieldset } ${ styles.form_fieldset_type_button }` }>
          <Button
            data-test-id={ BUTTON_ADD_TEST_ID }
            disabled={ isFormSubmitting || !value || queueSize === queue.getLength() }
            isLoader={ solutionState === SolutionStateVariety.Add }
            type={ 'submit' }
            text={ 'Добавить' }
            extraClass={ `${ styles.form_button } mr-3` }
          />
          <Button
            data-test-id={ BUTTON_REMOVE_TEST_ID }
            disabled={ queue.getLength() === 0 }
            isLoader={ solutionState === SolutionStateVariety.Delete }
            type={ 'button' }
            text={ 'Удалить' }
            extraClass={ styles.form_button }
            onClick={ handleDeleteFromQueue }
          />
          <Button
            data-test-id={ BUTTON_CLEAR_TEST_ID }
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
                key={ index }
                head={ item && queueSettings.head === index
                  ? HEAD
                  : '' }
                tail={ item && queueSettings.tail - 1 === index
                  ? TAIL
                  : '' }
              />
            ))
        }
      </div>
    </SolutionLayout>
  );
};
