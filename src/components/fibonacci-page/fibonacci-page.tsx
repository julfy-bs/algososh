import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { nanoid } from 'nanoid';
import { sleep } from '../../helpers/sleep';
import styles from './fibonacci-page.module.css';

export const FibonacciPage = () => {
  const [value, setValue] = useState<number | string>('');
  const [valuesArray, setValuesArray] = useState<number[]>([]);
  const [valueIndex, setValueIndex] = useState<number>(0);

  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [isCircleVisible, setIsCircleVisible] = useState<boolean>(false);

  const createFibonacci = (n: number): number[] => {
    let arr: number[] = [];
    for (let i = 0; i < +n + 1; i++) {
      if (arr.length === 0 || arr.length === 1) {
        arr.push(1);
      } else {
        arr.push(arr[i - 2] + arr[i - 1]);
      }
    }
    return arr;
  };

  const startFibonacci = async (n: number) => {
    const fibonacciArray = createFibonacci(n);
    setValuesArray(fibonacciArray);
    setValueIndex(0);
    let i = 0;
    while (i <= n) {
      setValueIndex(i);
      await sleep(1000);
      i++;
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.currentTarget.value);
    setIsCircleVisible(false);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsCircleVisible(true);
    setIsFormSubmitted(true);
    await startFibonacci(+value);
    setIsFormSubmitted(false);
  };


  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={ styles.form } onSubmit={ handleSubmit }>
        <Input
          value={ value }
          placeholder={ 'Введите число' }
          disabled={ isFormSubmitted }
          min={ 1 }
          max={ 19 }
          isLimitText={ true }
          type={ 'number' }
          onChange={ handleChange }
          autoComplete={ 'off' }
        />
        <Button
          type={ 'submit' }
          text={ 'Рассчитать' }
          isLoader={ isFormSubmitted }
          disabled={ isFormSubmitted || !value || value > 19 }
        />
      </form>
      <div className={ styles.wrapper }>
        {
          isCircleVisible
            ? valuesArray
              .map((item: number, index: number) => (
                <Circle
                  letter={ item.toString() }
                  key={ nanoid() }
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
