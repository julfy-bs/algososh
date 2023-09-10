import { render, screen, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Button } from './button';

describe('Компонент <Button /> рендерится без ошибок', () => {
  it('с текстом', () => {
    const mockString: string = 'Button';
    const button = renderer
      .create(<Button text={ mockString } />)
      .toJSON();
    expect(button).toMatchSnapshot();
  });
  it('без текста', () => {
    const button = renderer
      .create(<Button />)
      .toJSON();
    expect(button).toMatchSnapshot();
  });
  it('с заблокированной кнопкой', () => {
    const button = renderer
      .create(<Button disabled={ true } />)
      .toJSON();
    expect(button).toMatchSnapshot();
  });
  it('с индикацией загрузки', () => {
    const button = renderer
      .create(<Button isLoader={ true } />)
      .toJSON();
    expect(button).toMatchSnapshot();
  });
});

describe('Компонент <Button /> кликабельный', () => {
  it('Нажатие на кнопку вызывает корректный alert', () => {
    window.alert = jest.fn();
    render(
      <Button
        text={ 'Кнопка' }
        onClick={ () => alert('Кнопка работает') }
      />
    );
    const button = screen.getByText('Кнопка');
    fireEvent.click(button);
    expect(window.alert).toHaveBeenCalledWith('Кнопка работает');
  });
});
