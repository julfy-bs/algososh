import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { nanoid } from 'nanoid';
import styles from './fibonacci-page.module.css';
import { startFibonacciAlgorithm } from './utils/startFibonacciAlgorithm';

export const FibonacciPage = () => {
  const [value, setValue] = useState<number | string>('');
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
    await startFibonacciAlgorithm(
      +value,
      setValuesArray,
      setValueIndex
    );
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
