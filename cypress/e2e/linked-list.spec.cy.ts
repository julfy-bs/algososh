import * as list from '../../src/constants/tests/linked-list';
import * as circle from '../../src/constants/tests/circle';
import { TEST_URL } from '../../src/constants/tests/general';
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from '../../src/constants/delays';
import { INITIAL_ARRAY_LINKED_LIST } from '../../src/constants/algorithms-rules';

const values = INITIAL_ARRAY_LINKED_LIST;

const checkLength = (length: number) => {
  cy.get(circle.Element)
    .should('have.length', length);
  cy.get(circle.Element)
    .eq(0)
    .contains('head');
  cy.get(circle.Element)
    .eq(length - 1)
    .contains('tail');
};

describe('Страница визуализации алгоритма связного списка', () => {
  beforeEach(() => {
    cy.visit(`${ TEST_URL }/list`);
  });

  afterEach(() => {
    cy.get(list.inputValueElement)
      .clear()
      .should('be.empty');
    cy.get(list.inputIndexElement)
      .clear()
      .should('be.empty');
  });

  it('Кнопки добавления должны быть заблокированы при пустом инпуте', () => {
    cy.get(list.inputValueElement)
      .should('be.empty');
    cy.get(list.buttonAddToHead)
      .should('be.disabled');
    cy.get(list.buttonAddToTail)
      .should('be.disabled');
  });

  it('Кнопки добавления и удаления по индексу должны быть заблокированы при пустом инпуте', () => {
    cy.get(list.inputIndexElement)
      .should('not.be.disabled')
      .should('be.empty');
    cy.get(list.buttonAddToIndex)
      .should('be.disabled');
    cy.get(list.buttonRemoveFromIndex)
      .should('be.disabled');
  });

  it('Первоначальный список отрисовывается корректно', () => {
    cy.get(circle.Element)
      .should('have.length', values.length);

    values.forEach((value: string, index: number) => {
      cy.get(circle.Element)
        .each((element: Element, idx: number) => {
          index === idx &&
          expect(element)
            .contain(value);
        });
    });

    cy.get(circle.Element)
      .eq(0)
      .should('contain', 'head');

    cy.get(circle.Element)
      .eq(3)
      .should('contain', 'tail');
  });

  it('Добавление нового элемента в head выполняется корректно', () => {
    const testingValue = '10';
    cy.get(list.inputValueElement)
      .should('not.be.disabled')
      .should('be.empty')
      .type(testingValue);

    cy.get(list.buttonAddToHead)
      .should('not.be.disabled')
      .click();
    cy.get(circle.ElementChanging)
      .contains(testingValue);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circle.Element)
      .should('have.length', values.length + 1)
      .each((element: Element, index: number) => {
        index === 0 && expect(element)
          .contain(testingValue);
        index === 0 && expect(element)
          .contain('head');
        index === 4 && expect(element)
          .contain('tail');
      });
    cy.get(circle.ElementDefault)
      .contains(testingValue);
  });

  it('Добавление нового элемента в tail выполняется корректно', () => {
    const testingValue = '10';
    cy.get(list.inputValueElement)
      .should('not.be.disabled')
      .should('be.empty')
      .type(testingValue);

    cy.get(list.buttonAddToTail)
      .should('not.be.disabled')
      .click();
    cy.get(circle.ElementChanging)
      .contains(testingValue);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circle.Element)
      .should('have.length', values.length + 1)
      .each((element: Element, index: number) => {
        index === 0 && expect(element)
          .contain('head');
        index === 4 && expect(element)
          .contain(testingValue);
        index === 4 && expect(element)
          .contain('tail');
      });
    cy.get(circle.ElementDefault)
      .contains(testingValue);
  });

  it('Добавление нового элемента по индексу выполняется корректно', () => {
    const testingValue = '10';
    const testingIndex = '3';

    cy.get(list.inputValueElement)
      .should('not.be.disabled')
      .should('be.empty')
      .type(testingValue);

    cy.get(list.inputIndexElement)
      .should('not.be.disabled')
      .should('be.empty')
      .type(testingIndex);

    cy.get(list.buttonAddToIndex)
      .should('not.be.disabled')
      .click();

    cy.get(circle.ElementChanging)
      .contains(testingValue);

    cy.wait(DELAY_IN_MS * values.length);

    cy.get(circle.Element)
      .should('have.length', values.length + 1)
      .each((element: Element, index: number) => {
        index === 0 && expect(element)
          .contain('head');
        index === +testingIndex && expect(element)
          .contain(testingValue);
        index === 4 && expect(element)
          .contain('tail');
      });
    cy.get(circle.ElementDefault)
      .contains(testingValue);
  });

  it('Удаление элемента из head выполняется корректно', () => {
    cy.get(list.buttonRemoveFromHead)
      .should('not.be.disabled')
      .click();
    cy.get(circle.ElementChanging)
      .contains(values[0]);
    cy.wait(SHORT_DELAY_IN_MS);
    checkLength(values.length - 1);
  });

  it('Удаление элемента из tail выполняется корректно', () => {
    cy.get(list.buttonRemoveFromTail)
      .should('not.be.disabled')
      .click();
    cy.get(circle.ElementChanging)
      .contains(values[values.length - 1]);
    cy.wait(SHORT_DELAY_IN_MS);
    checkLength(values.length - 1);
  });

  it('Удаление элемента по индексу выполняется корректно', () => {
    const testingIndex: string = '3';
    cy.get(list.inputIndexElement)
      .type(testingIndex);
    cy.get(list.buttonRemoveFromIndex)
      .should('not.be.disabled')
      .click();

    cy.get(circle.Element)
      .eq(+testingIndex)
      .should('not.have.value');
    cy.get(circle.ElementChanging)
      .contains(values[+testingIndex]);
    cy.wait(DELAY_IN_MS);
    cy.get(circle.Element)
      .should('have.length', values.length - 1);
  });
});
