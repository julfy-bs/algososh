/**
 * @function
 * @name hexToRgb
 * Конвертирует цвет из шестнадцатеричного формата (hex) в rgb формат.
 * @example
 * hexToRgb('#d252e1');
 * // Возвращает 'rgb(210, 82, 225)'
 * @param {String} hex Строку с цветом в шестнадцатеричном формате.
 * @returns {String|null} Строку с цветом в rgb формате.
 */
export function hexToRgb(hex: string): string | null {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex,
    (match, r, g, b) => r + r + g + g + b + b);

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `rgb(${ parseInt(result[1], 16) }, ${ parseInt(result[2], 16) }, ${ parseInt(result[3], 16) })`
    : null;

}
