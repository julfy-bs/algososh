import { hexToRgb } from './hexToRgb';

describe('Функция конвертации цвета hexToRgb', () => {

  it('возвращает валидный rgb цвет', () => {
    const hexColor: string = '#ffffff';
    const rgbColor = hexToRgb(hexColor);
    expect(rgbColor).toBe('rgb(255, 255, 255)');
  });

  it('возвращает null если передана неправильная строка', () => {
    const rgbColor = hexToRgb('asdf');
    expect(rgbColor).toBeNull();
  });
});
