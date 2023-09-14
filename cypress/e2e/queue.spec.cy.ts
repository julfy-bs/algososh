import * as queue from '../../src/constants/tests/queue';
import * as circle from '../../src/constants/tests/circle';
import { TEST_URL } from '../../src/constants/tests/general';
import { DELAY_IN_MS } from '../../src/constants/delays';

const addCircle = (value: string): void => {
  cy.get(queue.inputElement).type(value).should('have.value', value);
  cy.get(queue.buttonAddElement).should('not.be.disabled').click();
  cy.get(circle.ElementChanging).contains(value);
  cy.wait(DELAY_IN_MS);
  cy.get(circle.ElementDefault).contains(value);
};

const removeCircle = (value: string): void => {
  cy.get(queue.buttonRemoveElement).should('not.be.disabled').click();
  cy.get(circle.ElementChanging).contains(value);
};

const values: string[] = ['42', '422'];

describe('', () => {
  beforeEach(() => {
    cy.visit(`${ TEST_URL }/queue`);
  });

  afterEach(() => {
    cy.get(queue.inputElement).clear().should('be.empty');
  });

  it('Кнопка добавления должна быть заблокирована при пустом инпуте', () => {
    cy.get(queue.inputElement).should('be.empty');
    cy.get(queue.buttonAddElement).should('be.disabled');
  });

  it('Добавление выполняется корректно', () => {
    addCircle(values[0]);
    cy.get(circle.Element).eq(0)
      .should('contain', values[0])
      .and('contain', 'head')
      .and('contain', 'tail');

    addCircle(values[1]);
    cy.get(circle.Element)
      .each((circle: Element, circleIndex: number) => {
        circleIndex === 1 && expect(circle).to.contain(values[1]);
        circleIndex === 1 && expect(circle).to.contain('tail');
        circleIndex === 0 && expect(circle).to.contain('head');
      });
  });

  it('Удаление выполняется корректно', () => {
    addCircle(values[0]);
    cy.get(circle.Element)
      .eq(0)
      .should('contain', values[0])
      .should('contain', 'head')
      .should('contain', 'tail');

    addCircle(values[1]);
    cy.get(circle.Element)
      .each((circle: Element, index: number) => {
        if (index === 0) {
          expect(circle).to.contain(values[0]);
          expect(circle).to.contain('head');
        }
        if (index === 1) {
          expect(circle).to.contain(values[1]);
          expect(circle).to.contain('tail');
        }
      });

    removeCircle(values[0]);
    cy.wait(DELAY_IN_MS);

    cy.get(circle.Element)
      .eq(1)
      .should('contain', values[1])
      .should('contain', 'head')
      .should('contain', 'tail');
    cy.get(circle.Element);
  });

  it('Очищение выполняется корректно', () => {
    values.forEach(value => addCircle(value));
    cy.get(queue.buttonClearElement).should('not.be.disabled').click()
    cy.wait(DELAY_IN_MS);
    cy.get(circle.Circle).should('not.have.value');
  });
});
