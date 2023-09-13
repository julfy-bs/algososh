/**
 * @function
 * @name hexToRgb
 * Конвертирует цвет из шестнадцатеричного формата (hex) в rgb формат.
 * @example
 * // Возвращает 'rgb(210, 82, 225)'
 * hexToRgb('#d252e1');
 * @param {String} hex Строку с цветом в шестнадцатеричном формате.
 * @returns {String} Строку с цветом в rgb формате.
 */
export function hexToRgb(hex: string): string {
  hex = hex.replace('#', '');
  const rValue: number = parseInt(hex.substring(0, 2), 16);
  const gValue: number = parseInt(hex.substring(2, 4), 16);
  const bValue: number = parseInt(hex.substring(4), 16);
  return `rgb(${ rValue }, ${ gValue }, ${ bValue })`;
}
