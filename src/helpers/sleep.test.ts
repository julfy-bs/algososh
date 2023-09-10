import { sleep } from './sleep';

describe('Функция ожидания работает корректно', () => {
  it('таймер проходит полностью прежде, чем выполняется функция', async () => {
    const cooldown = 10;
    const before = new Date().getTime();
    await sleep(cooldown);
    const after = new Date().getTime();
    const difference = after - before;
    expect(difference).toBeGreaterThanOrEqual(cooldown);
  });
})
