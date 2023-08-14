import { ReactEventHandler, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './sorting-page.module.css';
import { Button } from '../ui/button/button';
import { RadioInput } from '../ui/radio-input/radio-input';
import { Column } from '../ui/column/column';
import { Direction, SortDirection, SortElement, SortType, Type } from '../../types/sort';
import { randomArr } from './utils';
import { ElementStates, ElementStatesVariety } from '../../types/element-states';
import { sleep } from '../../helpers/sleep';
import { swap } from '../../helpers/swap';

type SortOptions = {
  array: SortElement[];
  direction: SortDirection;
  type: SortType;
}

export const SortingPage = () => {
  const [sortType, setSortType] = useState<SortType>(Type.Selection);
  const [sortDirection, setSortDirection] = useState<SortDirection>();
  const [sortArray, setSortArray] = useState<SortElement[]>([]);
  const [isSortInProgress, setIsSortInProgress] = useState<boolean>(false);

  const changeColor = (element: SortElement, color: ElementStatesVariety): SortElement => {
    return {
      ...element,
      state: color
    };
  };

  const bubbleSort = ({
                        array,
                        direction
                      }: Omit<SortOptions, 'type'>): SortElement[][] => {
    let copyArray: SortElement[] = [...array];
    let arraySortingMap: SortElement[][] = [];
    for (let j = copyArray!.length - 1; j >= 0; j--) {
      for (let i = 0; i < j; i++) {
        copyArray[i] = changeColor(copyArray[i], ElementStates.Changing);
        copyArray[i + 1] = changeColor(copyArray[i + 1], ElementStates.Changing);
        arraySortingMap.push([...copyArray]);
        if (direction === Direction.Descending && copyArray[i].value < copyArray[i + 1].value) {
          swap(copyArray, i, i + 1);
          arraySortingMap.push([...copyArray]);
        }
        if (direction === Direction.Ascending && copyArray[i].value > copyArray[i + 1].value) {
          swap(copyArray, i, i + 1);
          arraySortingMap.push([...copyArray]);
        }
        copyArray[i] = changeColor(copyArray[i], ElementStates.Default);
        copyArray[i + 1] = changeColor(copyArray[i + 1], ElementStates.Default);
        arraySortingMap.push([...copyArray]);
      }
      copyArray[j] = changeColor(copyArray[j], ElementStates.Modified);
      arraySortingMap.push([...copyArray]);
    }
    return arraySortingMap;
  };

  const selectionSort = ({
                           array,
                           direction
                         }: Omit<SortOptions, 'type'>): SortElement[][] => {
    let copyArray: SortElement[] = [...array];
    let arraySortingMap: SortElement[][] = [];
    const { length } = copyArray;
    for (let i = 0; i < length; i++) {
      let target = i;
      for (let j = i + 1; j < length; j++) {
        copyArray[target] = changeColor(copyArray[target], ElementStates.Changing);
        copyArray[j] = changeColor(copyArray[j], ElementStates.Changing);
        arraySortingMap.push([...copyArray]);
        if (direction === Direction.Descending && copyArray[j].value > copyArray[target].value) {
          swap(copyArray, target, j);
          arraySortingMap.push([...copyArray]);
        }
        if (direction === Direction.Ascending && copyArray[j].value < copyArray[target].value) {
          swap(copyArray, target, j);
          arraySortingMap.push([...copyArray]);
        }
        copyArray[target] = changeColor(copyArray[target], ElementStates.Default);
        copyArray[j] = changeColor(copyArray[j], ElementStates.Default);
        arraySortingMap.push([...copyArray]);
      }
      copyArray[target] = changeColor(copyArray[target], ElementStates.Modified);
      arraySortingMap.push([...copyArray]);
    }
    return arraySortingMap;
  };
  const startSorting = async (sortOptions: SortOptions) => {
    setIsSortInProgress(true);
    let index = 0;
    let arraySortingMap: SortElement[][];

    (sortOptions.type === Type.Selection)
      ? arraySortingMap = selectionSort(sortOptions)
      : arraySortingMap = bubbleSort(sortOptions);

    while (index < arraySortingMap.length) {
      setSortArray(arraySortingMap[index]);
      await sleep(400);
      index++;
    }
    setIsSortInProgress(false);
  };


  const handleAscending = async () => {
    setSortDirection(Direction.Ascending);
    await startSorting({
      array: sortArray,
      direction: Direction.Ascending,
      type: sortType
    });
  };

  const handleDescending = async () => {
    setSortDirection(Direction.Descending);
    await startSorting({
      array: sortArray,
      direction: Direction.Descending,
      type: sortType
    });
  };

  const handleCreateRandomArrayButton: ReactEventHandler<HTMLButtonElement> = () => {
    const newArray = randomArr({ maxLength: 17 });
    setSortArray(newArray);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={ styles.form }>
        <fieldset className={ `${ styles.form_fieldset } ${ styles.form_fieldset_type_radio }` }>
          <RadioInput
            disabled={ isSortInProgress }
            label={ 'Выбор' }
            name="radio"
            value={ sortType }
            onChange={ () => setSortType(Type.Selection) }
            defaultChecked
          />
          <RadioInput
            disabled={ isSortInProgress }
            label={ 'Пузырёк' }
            name="radio"
            value={ sortType }
            onChange={ () => setSortType(Type.Bubble) }
          />
        </fieldset>
        <fieldset className={ `${ styles.form_fieldset } ${ styles.form_fieldset_type_button }` }>
          <Button
            isLoader={ isSortInProgress && sortDirection === Direction.Ascending }
            disabled={ isSortInProgress }
            sorting={ Direction.Ascending }
            type={ 'button' }
            text={ 'По возрастанию' }
            extraClass={ `${ styles.form_button } mr-3` }
            onClick={ handleAscending }
          />
          <Button
            isLoader={ isSortInProgress && sortDirection === Direction.Descending }
            disabled={ isSortInProgress }
            sorting={ Direction.Descending }
            type={ 'button' }
            text={ 'По убыванию' }
            extraClass={ styles.form_button }
            onClick={ handleDescending }
          />
          <Button
            disabled={ isSortInProgress }
            type={ 'button' }
            text={ 'Новый массив' }
            extraClass={ styles.form_button }
            onClick={ handleCreateRandomArrayButton }
          />
        </fieldset>
      </form>
      <div className={ styles.wrapper }>
        {
          sortArray?.map(item => (
            <Column
              key={ item.id }
              index={ item.value }
              state={ item.state }
            />
          ))
        }
      </div>
    </SolutionLayout>
  );
};
