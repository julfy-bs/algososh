import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { getFibonacciNumbers } from './utils/getFibonacciNumbers';
import { sleep } from '../../helpers/sleep';
import { INPUT_MAX_VALUE_FIBONACCI, INPUT_MIN_VALUE_FIBONACCI } from '../../constants/algorithmsRules';
import { DELAY_IN_MS } from '../../constants/delays';
import styles from './fibonacci-page.module.css';
import { TEST_ID_FIB_BUTTON, TEST_ID_FIB_INPUT } from '../../constants/test';

export const FibonacciPage = () => {
  const [value, setValue] = useState<string>('');
  const [valuesArray, setValuesArray] = useState<number[]>([]);
  const [valueIndex, setValueIndex] = useState<number>(0);

  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [isCircleVisible, setIsCircleVisible] = useState<boolean>(false);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.currentTarget.value);
    setIsCircleVisible(false);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsCircleVisible(true);
    setIsFormSubmitted(true);
    const fibonacciArray = getFibonacciNumbers(+value);
    setValuesArray(fibonacciArray);
    setValueIndex(0);
    let i = 0;
    while (i <= +value) {
      setValueIndex(i);
      await sleep(DELAY_IN_MS);
      i++;
    }
    setIsFormSubmitted(false);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={ styles.form } onSubmit={ handleSubmit }>
        <Input
          data-test-id={TEST_ID_FIB_INPUT}
          value={ value }
          placeholder={ 'Введите число' }
          disabled={ isFormSubmitted }
          min={ INPUT_MIN_VALUE_FIBONACCI }
          max={ INPUT_MAX_VALUE_FIBONACCI }
          isLimitText={ true }
          type={ 'number' }
          onChange={ handleChange }
          autoComplete={ 'off' }
        />
        <Button
          data-test-id={TEST_ID_FIB_BUTTON}
          type={ 'submit' }
          text={ 'Рассчитать' }
          isLoader={ isFormSubmitted }
          disabled={
            isFormSubmitted
            || !value
            || +value < INPUT_MIN_VALUE_FIBONACCI
            || +value > INPUT_MAX_VALUE_FIBONACCI
          }
        />
      </form>
      <div className={ styles.wrapper }>
        {
          isCircleVisible
            ? valuesArray
              .map((item: number, index: number) => (
                <Circle
                  letter={ item.toString() }
                  key={ index }
                  index={ index }
                  extraClass={
                    (valueIndex === index || valueIndex > index)
                      ? ''
                      : styles.circle_invisible
                  }
                />
              ))
            : (<></>)
        }
      </div>
    </SolutionLayout>
  );
};
