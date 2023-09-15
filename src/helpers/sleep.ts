/**
 * @async
 * @function
 * @name sleep
 * Функция для паузы между шагами анимаций.
 * @example
 * // Пауза продлится 1000 мс.
 * sleep(1000);
 * @param {Number} milliseconds Колличество миллисекунд для ожидания между шагами анимации.
 * @returns {Promise<undefined>} Пустой Promise.
 */
export const sleep = (milliseconds: number): Promise<undefined> =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));
