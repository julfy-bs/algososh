import { useEffect, useMemo, useState } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './list-page.module.css';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { LinkedList, LinkedListNode } from './utils/linkedList';
import { ArrowIcon } from '../ui/icons/arrow-icon';
import { Circle } from '../ui/circle/circle';
import { nanoid } from 'nanoid';
import { ElementStates, ElementStatesVariety } from '../../types/element-states';
import { sleep } from '../../helpers/sleep';
import { LinkedListState, LinkedListStateVariety } from '../../types/linkedList';

export const ListPage = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [inputIndex, setInputIndex] = useState<string>('');
  const [array, setArray] = useState<LinkedListNode<string>[]>([]);
  const [changingIndex, setChangingIndex] = useState<number | null>(null);
  const [isIndexInSearch, setIsIndexInSearch] = useState<boolean>(false);

  const [solutionState, setSolutionState] = useState<LinkedListState>(LinkedListStateVariety.Empty);
  const [isFormSubmitting, setIsFormSubmitting] = useState<boolean>(false);
  const [initialArray] = useState<string[]>(['0', '34', '8', '1']);
  const list = useMemo(() => new LinkedList<string>(), []);

  useEffect(() => {
    list.fromArray(initialArray);
    const arrayFromLinkedList = list.toArray();
    setArray(arrayFromLinkedList);
  }, []);

  const handleAddNewHead = async () => {
    setIsFormSubmitting(true);
    setSolutionState(LinkedListStateVariety.AddToHead);
    setChangingIndex(0);
    await sleep(500);
    list.prepend(inputValue);
    const arrayFromLinkedList = list.toArray();
    setArray(arrayFromLinkedList);
    setSolutionState(LinkedListStateVariety.Success);
    await sleep(500);
    setInputValue('');
    setChangingIndex(null);
    setSolutionState(LinkedListStateVariety.Empty);
    setIsFormSubmitting(false);
  };

  const handleAddNewTail = async () => {
    setIsFormSubmitting(true);
    setSolutionState(LinkedListStateVariety.AddToTail);
    setChangingIndex(array.length - 1);
    await sleep(500);
    setChangingIndex(array.length);
    list.append(inputValue);
    const arrayFromLinkedList = list.toArray();
    setArray(arrayFromLinkedList);
    setSolutionState(LinkedListStateVariety.Success);
    await sleep(500);
    setInputValue('');
    setChangingIndex(null);
    setSolutionState(LinkedListStateVariety.Empty);
    setIsFormSubmitting(false);
  };

  const handleDeleteHead = async () => {
    setIsFormSubmitting(true);
    setSolutionState(LinkedListStateVariety.DeleteFromHead);
    setChangingIndex(0);
    await sleep(1000);
    list.deleteHead();
    const arrayFromLinkedList = list.toArray();
    setArray(arrayFromLinkedList);
    setChangingIndex(null);
    setSolutionState(LinkedListStateVariety.Empty);
    setIsFormSubmitting(false);
  };

  const handleDeleteTail = async () => {
    setIsFormSubmitting(true);
    setSolutionState(LinkedListStateVariety.DeleteFromTail);
    setChangingIndex(array.length - 1);
    await sleep(1000);
    list.deleteTail();
    const arrayFromLinkedList = list.toArray();
    setArray(arrayFromLinkedList);
    setChangingIndex(null);
    setSolutionState(LinkedListStateVariety.Empty);
    setIsFormSubmitting(false);
  };

  const handleAddByIndex = async () => {
    setIsFormSubmitting(true);
    setSolutionState(LinkedListStateVariety.AddByIndex);
    const addItemAtIndex = Number(inputIndex);
    setChangingIndex(addItemAtIndex);
    setIsIndexInSearch(true);
    let i = 0;
    while (i <= addItemAtIndex) {
      setChangingIndex(i);
      await sleep(500);
      i++;
    }
    list.addByIndex(inputValue, addItemAtIndex);
    const arrayFromLinkedList = list.toArray();
    setArray(arrayFromLinkedList);
    setSolutionState(LinkedListStateVariety.Success);
    await sleep(500);
    setInputIndex('');
    setInputValue('');
    setIsIndexInSearch(false);
    setChangingIndex(null);
    setSolutionState(LinkedListStateVariety.Empty);
    setIsFormSubmitting(false);
  };

  const handleDeleteByIndex = async () => {
    setIsFormSubmitting(true);
    setSolutionState(LinkedListStateVariety.DeleteByIndex);
    const deleteIndex = Number(inputIndex);
    setInputIndex('');
    setChangingIndex(deleteIndex);
    await sleep(1000);
    list.deleteByIndex(deleteIndex);
    const arrayFromLinkedList = list.toArray();
    setArray(arrayFromLinkedList);
    setChangingIndex(null);
    setSolutionState(LinkedListStateVariety.Empty);
    setIsFormSubmitting(false);
  };

  const findState = (item: LinkedListNode<string>, index: number): ElementStatesVariety => {

    if (changingIndex && isIndexInSearch && index < changingIndex) {
      return ElementStates.Changing;
    }
    if (changingIndex && isIndexInSearch && solutionState === LinkedListStateVariety.Success && index === changingIndex) {
      return ElementStates.Modified;
    }
    return ElementStates.Default;
  };

  const setHead = (
    item: LinkedListNode<string>,
    index: number,
    value: string
  ) => {
    if (
      index === changingIndex
      && (
        (
          solutionState === LinkedListStateVariety.AddToHead
          || solutionState === LinkedListStateVariety.AddToTail
          || solutionState === LinkedListStateVariety.AddByIndex
        )
      )
    ) {
      return (
        <Circle
          state={ ElementStates.Changing }
          isSmall={ true }
          letter={ value }
        />
      );
    } else if (index === 0) {
      return 'head';
    } else {
      return '';
    }
  };

  const setTail = (
    item: LinkedListNode<string>,
    index: number
  ) => {
    if (index === changingIndex &&
      (solutionState === LinkedListStateVariety.DeleteFromHead
        || solutionState === LinkedListStateVariety.DeleteFromTail
        || solutionState === LinkedListStateVariety.DeleteByIndex)
    ) {
      return (
        <Circle
          state={ ElementStates.Changing }
          isSmall={ true }
          letter={ item.value }
        />
      );
    } else if (index === array.length - 1) {
      return 'tail';
    } else {
      return '';
    }
  };

  const findCircleValue = (
    item: LinkedListNode<string>,
    index: number
  ) => {
    if (inputValue && index === changingIndex) {
      return inputValue;
    }
    if (index === changingIndex) {
      return '';
    }
    return item.value;
  };

  return (
    <SolutionLayout title="Связный список">
      <form className={ styles.form }>
        <fieldset className={ `${ styles.form_fieldset }` }>
          <Input
            disabled={ isFormSubmitting || array.length >= 7 }
            value={ inputValue }
            maxLength={ 4 }
            isLimitText={ true }
            onChange={ (e) => setInputValue(e.currentTarget.value) }
            extraClass={ styles.form_input }
            placeholder={ 'Введите значение' }
          />
          <Button
            disabled={ isFormSubmitting || !inputValue }
            isLoader={ solutionState === LinkedListStateVariety.AddToHead }
            type={ 'button' }
            text={ 'Добавить в head' }
            extraClass={ `${ styles.form_button }` }
            onClick={ handleAddNewHead }
          />
          <Button
            disabled={ isFormSubmitting || !inputValue }
            isLoader={ solutionState === LinkedListStateVariety.AddToTail }
            type={ 'button' }
            text={ 'Добавить в tail' }
            extraClass={ styles.form_button }
            onClick={ handleAddNewTail }
          />
          <Button
            disabled={ isFormSubmitting || array.length <= 0 }
            isLoader={ solutionState === LinkedListStateVariety.DeleteFromHead }
            type={ 'button' }
            text={ 'Удалить из head' }
            extraClass={ `${ styles.form_button }` }
            onClick={ handleDeleteHead }
          />
          <Button
            disabled={ isFormSubmitting || array.length <= 0 }
            isLoader={ solutionState === LinkedListStateVariety.DeleteFromTail }
            type={ 'button' }
            text={ 'Удалить из tail' }
            extraClass={ styles.form_button }
            onClick={ handleDeleteTail }
          />
        </fieldset>
        <fieldset className={ `${ styles.form_fieldset } ${ styles.form_fieldset_type_index }` }>
          <Input
            disabled={ array.length === 0 || isFormSubmitting }
            value={ inputIndex }
            onChange={ (e) => setInputIndex(e.currentTarget.value) }
            min={ 0 }
            max={ array.length > 1 ? array.length - 1 : ' 0 ' }
            type={ 'number' }
            extraClass={ styles.form_input }
            placeholder={ 'Введите индекс' }
          />
          <Button
            disabled={ Number(inputIndex) < 0 || Number(inputIndex) >= array.length || isFormSubmitting || !inputIndex || !inputValue }
            isLoader={ solutionState === LinkedListStateVariety.AddByIndex }
            type={ 'button' }
            text={ 'Добавить по индексу' }
            extraClass={ `${ styles.form_button } ${ styles.form_button_type_index }` }
            onClick={ handleAddByIndex }
          />
          <Button
            disabled={ Number(inputIndex) < 0 || Number(inputIndex) >= array.length || isFormSubmitting || !inputIndex }
            isLoader={ solutionState === LinkedListStateVariety.DeleteByIndex }
            type={ 'button' }
            text={ 'Удалить по индексу' }
            extraClass={ `${ styles.form_button } ${ styles.form_button_type_index }` }
            onClick={ handleDeleteByIndex }
          />
        </fieldset>
      </form>
      <ul className={ styles.wrapper }>
        {
          array.length > 0
            ? array.map((item: LinkedListNode<string>, index) => (
              <li
                className={ styles.wrapper_element }
                key={ nanoid() }
              >
                <Circle
                  state={ findState(item, index) }
                  tail={ setTail(item, index) }
                  head={ setHead(item, index, inputValue) }
                  index={ index }
                  letter={ findCircleValue(item, index) }
                />
                {
                  !(array.length - 1 === index) &&
                  <ArrowIcon
                    fill={
                      changingIndex
                      && solutionState ===
                      LinkedListStateVariety.AddByIndex
                      && index < changingIndex
                        ? '#d252e1'
                        : '#0032ff'
                    }
                  />
                }
              </li>
            ))
            : <></>
        }
      </ul>
    </SolutionLayout>
  );
};
