import { TEST_URL } from '../../src/constants/tests/general';
import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';
import * as stack from '../../src/constants/tests/stack';
import * as circle from '../../src/constants/tests/circle';

const addCircle = (value: string) => {
  cy.get(stack.inputElement).type(value).should('have.value', value);
  cy.get(stack.buttonAddElement).should('not.be.disabled').click();
  cy.get(circle.ElementChanging).contains(value);
  cy.wait(SHORT_DELAY_IN_MS);
  cy.get(circle.ElementDefault).contains(value);
};

const removeCircle = (value: string, length: number) => {
  cy.get(stack.buttonRemoveElement).should('not.be.disabled').click();
  cy.get(circle.ElementChanging).contains(value);
  cy.get(circle.ElementDefault)
    .each((circle: Element, index: number) => {
      if (index === length - 1) {
        expect(circle).to.contain(value);
        expect(circle).to.contain('top');
      }
    });
};

const values = ['1', '2'];

describe('Страница визуализации алгоритма стэка', () => {

  beforeEach(() => {
    cy.visit(`${ TEST_URL }/stack`);
  });

  afterEach(() => {
    cy.get(stack.inputElement)
      .clear()
      .should('be.empty');
  });

  it('Кнопка добавления должна быть заблокирована при пустом инпуте', () => {
    cy.get(stack.inputElement).should('be.empty');
    cy.get(stack.buttonAddElement).should('be.disabled');
  });

  it('Добавление выполняется корректно', () => {
    values.forEach((value: string, valueIndex: number) => {
      addCircle(value);
      cy.get(circle.Element)
        .should('have.length', valueIndex + 1)
        .each((circle: Element, circleIndex: number) => {
          if (circleIndex === valueIndex) {
            expect(circle).to.contain(value);
            expect(circle).to.contain('top');
            expect(circle).to.contain(valueIndex);
          }
        });
    });
  });

  it('Удаление выполняется корректно', () => {
    values.forEach(value => addCircle(value));
    removeCircle(values[values.length - 1], values.length);
    cy.get(circle.Element)
      .should('have.length', 1)
      .each((circle: Element) => {
        expect(circle).to.contain(values[0]);
        expect(circle).to.contain('top');
      });
  });

  it('Очищение выполняется корректно', () => {
    values.forEach(value => addCircle(value));
    cy.get(stack.buttonClearElement).should('not.be.disabled').click();
    cy.get(circle.Element).should('have.length', 0);
  });
});
