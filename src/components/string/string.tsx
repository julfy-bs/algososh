import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import styles from './string.module.css';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Circle } from '../ui/circle/circle';
import { Button } from '../ui/button/button';
import { sleep } from '../../helpers/sleep';
import { changeCircleColor } from './utils';
import { nanoid } from 'nanoid';
import { swap } from '../../helpers/swap';

export const StringComponent = () => {
  const [value, setValue] = useState<string>('');
  const [valuesArray, setValuesArray] = useState<string[]>([]);

  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [isCircleVisible, setIsCircleVisible] = useState<boolean>(false);

  const [pointerFirst, setPointerFirst] = useState<number>(0);
  const [pointerSecond, setPointerSecond] = useState<number>(0);

  const reverseString = async () => {
    setIsFormSubmitted(true);
    setIsCircleVisible(true);
    let start = 0;
    let end = valuesArray.length - 1;
    while (start < end) {
      setPointerFirst(start);
      setPointerSecond(end);
      await sleep(1000);
      swap(valuesArray, start, end);
      setValuesArray(valuesArray);
      start++;
      end--;
    }
    setPointerFirst(valuesArray.length);
    setPointerSecond(valuesArray.length);
    setIsFormSubmitted(false);
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const target = e.currentTarget.value;
    setValue(target);
    setValuesArray(target.split(''));
    setIsCircleVisible(false);
    setPointerFirst(0);
    setPointerSecond(valuesArray.length - 1);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setValue('');
    await reverseString();
  };

  return (
    <SolutionLayout title="Строка">
      <form className={ styles.form } onSubmit={ handleSubmit }>
        <Input
          value={ value }
          disabled={ isFormSubmitted }
          maxLength={ 11 }
          isLimitText={ true }
          extraClass={ styles.input_for_string }
          onChange={ handleChange }
          autoComplete={ 'off' }
        />
        <Button
          type={ 'submit' }
          text={ 'Развернуть' }
          isLoader={ isFormSubmitted }
          disabled={ isFormSubmitted || !value }
        />
      </form>
      <div className={ styles.wrapper }>
        {
          isCircleVisible
            ? valuesArray
              .map((item: string, index: number) => (
                <Circle
                  state={ changeCircleColor(pointerFirst, pointerSecond, index) }
                  letter={ item }
                  key={ nanoid() }
                />
              ))
            : (<></>)
        }
      </div>
    </SolutionLayout>
  );
};
