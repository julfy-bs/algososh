import { TEST_ID_FIB_BUTTON, TEST_ID_FIB_INPUT, TEST_URL } from '../../src/constants/test';
import { INPUT_MAX_VALUE_FIBONACCI, INPUT_MIN_VALUE_FIBONACCI } from '../../src/constants/algorithmsRules';
import { DELAY_IN_MS } from '../../src/constants/delays';

describe('Страница визуализации отображения последовальности Фибоначчи', () => {
  beforeEach(() => {
    cy.visit(`${TEST_URL}/fibonacci`);
  });

  afterEach(() => {
    cy.get(`[data-test-id=${TEST_ID_FIB_INPUT}]`).clear().should('be.empty');
  });

  it('Кнопка заблокирована при пустом инпуте', () => {
    cy.get(`[data-test-id=${TEST_ID_FIB_INPUT}]`).should('be.empty');
    cy.get(`[data-test-id=${TEST_ID_FIB_BUTTON}]`).should('be.disabled');
  });

  it('Кнопка не заблокирована при минимальном значении', () => {
    cy.get(`[data-test-id=${TEST_ID_FIB_INPUT}]`).type(`${INPUT_MIN_VALUE_FIBONACCI}`).should('have.value', `${INPUT_MIN_VALUE_FIBONACCI}`);
    cy.get(`[data-test-id=${TEST_ID_FIB_BUTTON}]`).should('not.be.disabled');
  });

  it('Кнопка не заблокирована при максимальном значении', () => {
    cy.get(`[data-test-id=${TEST_ID_FIB_INPUT}]`).type(`${INPUT_MAX_VALUE_FIBONACCI}`).should('have.value', `${INPUT_MAX_VALUE_FIBONACCI}`);
    cy.get(`[data-test-id=${TEST_ID_FIB_BUTTON}]`).should('not.be.disabled');
  });

  it('Кнопка не заблокирована при случайном значении в диапазоне от минимального до максимального', () => {
    const randomValue = Math.round(Math.random() * (INPUT_MAX_VALUE_FIBONACCI - INPUT_MIN_VALUE_FIBONACCI) + INPUT_MIN_VALUE_FIBONACCI);
    cy.get(`[data-test-id=${TEST_ID_FIB_INPUT}]`).type(`${randomValue}`).should('have.value', `${randomValue}`);
    cy.get(`[data-test-id=${TEST_ID_FIB_BUTTON}]`).should('not.be.disabled');
  });

  it('Последовательность Фибоначчи генерируется корректно', () => {
    const testingValue = 6;
    const expectedArray = [1, 1, 2, 3, 5, 8, 13];
    cy.get(`[data-test-id=${TEST_ID_FIB_INPUT}]`).type(`${testingValue}`).should('have.value', `${testingValue}`);
    cy.get(`[data-test-id=${TEST_ID_FIB_BUTTON}]`).click();

    cy.get('[class^=circle_circle]')
      .should('have.length', expectedArray.length)
      .each((el, index) => {
        const expectedNumber = expectedArray[index];
        expect(el).to.contain(expectedNumber.toString());
      });

    cy.wait(DELAY_IN_MS * testingValue);
  });
});
