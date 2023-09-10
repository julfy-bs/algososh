import { reverseString } from './utils/reverseString';

describe('Разворот строки проходит успешно', () => {
  const setValuesArray = jest.fn();
  const setPointerFirst = jest.fn();
  const setPointerSecond = jest.fn();

  it('с четным количеством символов', async () => {
    const value: string = '123456';
    const valuesArray: string[] = value.split('');
    const expectedValue: string = '654321';
    const expectedValuesArray: string[] = expectedValue.split('');

    await reverseString(valuesArray, setValuesArray, setPointerFirst, setPointerSecond);
    expect(setValuesArray).toHaveBeenLastCalledWith(expectedValuesArray);
  });

  it('с нечетным количеством символов', async () => {
    const value: string = '123';
    const valuesArray: string[] = value.split('');
    const expectedValue: string = '321';
    const expectedValuesArray: string[] = expectedValue.split('');

    await reverseString(valuesArray, setValuesArray, setPointerFirst, setPointerSecond);
    expect(setValuesArray).toHaveBeenLastCalledWith(expectedValuesArray);
  });

  it('с одним символом', async () => {
    const value: string = '1';
    const valuesArray: string[] = value.split('');
    const expectedValue: string = '1';
    const expectedValuesArray: string[] = expectedValue.split('');

    await reverseString(valuesArray, setValuesArray, setPointerFirst, setPointerSecond);
    expect(setValuesArray).toHaveBeenLastCalledWith(expectedValuesArray);
  });

  it('с пустой строкой', async () => {
    const value: string = '';
    const valuesArray: string[] = value.split('');

    await reverseString(valuesArray, setValuesArray, setPointerFirst, setPointerSecond);
    expect(setValuesArray).toHaveBeenCalledTimes(0);
  });
});
