import * as fibonacci from '../../src/constants/tests/fibonacci';

import { INPUT_MAX_VALUE_FIBONACCI, INPUT_MIN_VALUE_FIBONACCI } from '../../src/constants/algorithms-rules';
import { DELAY_IN_MS } from '../../src/constants/delays';
import { TEST_URL } from '../../src/constants/tests/general';


describe('Страница визуализации отображения последовальности Фибоначчи', () => {

  beforeEach(() => {
    cy.visit(`${ TEST_URL }/fibonacci`);
  });

  afterEach(() => {
    cy.get(fibonacci.inputElement).clear().should('be.empty');
  });

  it('Кнопка заблокирована при пустом инпуте', () => {
    cy.get(fibonacci.inputElement).should('be.empty');
    cy.get(fibonacci.buttonElement).should('be.disabled');
  });

  it('Кнопка не заблокирована при минимальном значении', () => {
    cy.get(fibonacci.inputElement).type(`${ INPUT_MIN_VALUE_FIBONACCI }`).should('have.value', `${ INPUT_MIN_VALUE_FIBONACCI }`);
    cy.get(fibonacci.buttonElement).should('not.be.disabled');
  });

  it('Кнопка не заблокирована при максимальном значении', () => {
    cy.get(fibonacci.inputElement).type(`${ INPUT_MAX_VALUE_FIBONACCI }`).should('have.value', `${ INPUT_MAX_VALUE_FIBONACCI }`);
    cy.get(fibonacci.buttonElement).should('not.be.disabled');
  });

  it('Кнопка не заблокирована при случайном значении в диапазоне от минимального до максимального', () => {
    const randomValue = Math.round(Math.random() * (INPUT_MAX_VALUE_FIBONACCI - INPUT_MIN_VALUE_FIBONACCI) + INPUT_MIN_VALUE_FIBONACCI);
    cy.get(fibonacci.inputElement).type(`${ randomValue }`).should('have.value', `${ randomValue }`);
    cy.get(fibonacci.buttonElement).should('not.be.disabled');
  });

  it('Последовательность Фибоначчи генерируется корректно', () => {
    const testingValue = 6;
    const expectedArray = [1, 1, 2, 3, 5, 8, 13];
    cy.get(fibonacci.inputElement).type(`${ testingValue }`).should('have.value', `${ testingValue }`);
    cy.get(fibonacci.buttonElement).should('not.be.disabled').click();

    cy.get('[class^=circle_circle]')
      .should('have.length', expectedArray.length)
      .each((el: Element, index: number) => {
        const expectedNumber = expectedArray[index];
        expect(el).to.contain(expectedNumber.toString());
      });

    cy.wait(DELAY_IN_MS * testingValue);
  });
});
