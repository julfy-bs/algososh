import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import styles from './string-page.module.css';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Input } from '../ui/input/input';
import { Circle } from '../ui/circle/circle';
import { Button } from '../ui/button/button';
import { changeCircleColor } from './utils/changeCircleColor';
import { INPUT_MAX_LENGTH_STRING } from '../../constants/algorithmsRules';
import { reverseString } from './utils/reverseString';
import { DELAY_IN_MS } from '../../constants/delays';

export const StringComponent = () => {
  const [value, setValue] = useState<string>('');
  const [valuesArray, setValuesArray] = useState<string[]>([]);

  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [isCircleVisible, setIsCircleVisible] = useState<boolean>(false);

  const [pointerFirst, setPointerFirst] = useState<number>(0);
  const [pointerSecond, setPointerSecond] = useState<number>(0);

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
    setIsFormSubmitted(true);
    setIsCircleVisible(true);
    setValue('');
    await reverseString(
      valuesArray,
      setValuesArray,
      setPointerFirst,
      setPointerSecond,
      DELAY_IN_MS
    );
    setPointerFirst(valuesArray.length);
    setPointerSecond(valuesArray.length);
    setIsFormSubmitted(false);
  };

  return (
    <SolutionLayout title="Строка">
      <form
        className={ styles.form }
        onSubmit={ handleSubmit }
      >
        <Input
          value={ value }
          disabled={ isFormSubmitted }
          maxLength={ INPUT_MAX_LENGTH_STRING }
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
                  key={ index }
                />
              ))
            : (<></>)
        }
      </div>
    </SolutionLayout>
  );
};
