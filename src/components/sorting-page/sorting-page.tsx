import { ReactEventHandler, useState } from 'react';
import { Direction, SortDirection, SortElement, SortOptions, SortType, Type } from '../../types/sort';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Button } from '../ui/button/button';
import { RadioInput } from '../ui/radio-input/radio-input';
import { Column } from '../ui/column/column';
import { createRandomArray } from './utils/createRandomArray';
import { sortWithSelection } from './utils/sortWithSelection';
import { sortWithBubble } from './utils/sortWithBubble';
import { sleep } from '../../helpers/sleep';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import styles from './sorting-page.module.css';


export const SortingPage = () => {
  const [sortType, setSortType] = useState<SortType>(Type.Selection);
  const [sortDirection, setSortDirection] = useState<SortDirection>(Direction.Ascending);
  const [sortArray, setSortArray] = useState<SortElement[]>([]);
  const [isSortInProgress, setIsSortInProgress] = useState<boolean>(false);

  const startSorting = async (sortOptions: SortOptions) => {
    setIsSortInProgress(true);
    let index = 0;
    let arraySortingMap: SortElement[][];

    (sortOptions.type === Type.Selection)
      ? arraySortingMap = sortWithSelection(sortOptions)
      : arraySortingMap = sortWithBubble(sortOptions);

    while (index < arraySortingMap.length) {
      setSortArray(arraySortingMap[index]);
      await sleep(SHORT_DELAY_IN_MS);
      index++;
    }
    setIsSortInProgress(false);
  };

  const handleAscending: ReactEventHandler<HTMLButtonElement> = async () => {
    setSortDirection(Direction.Ascending);
    await startSorting({
      array: sortArray,
      direction: Direction.Ascending,
      type: sortType
    });
  };

  const handleDescending: ReactEventHandler<HTMLButtonElement> = async () => {
    setSortDirection(Direction.Descending);
    await startSorting({
      array: sortArray,
      direction: Direction.Descending,
      type: sortType
    });
  };

  const handleCreateRandomArrayButton: ReactEventHandler<HTMLButtonElement> = () => {
    setSortArray(createRandomArray());
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
