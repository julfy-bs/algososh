import { TEST_ID_STRING_BUTTON, TEST_ID_STRING_INPUT, TEST_URL } from '../../src/constants/test';
import { DELAY_IN_MS } from '../../src/constants/delays';

describe('Страница визуализации алгоритма строки', () => {

  beforeEach(() => {
    cy.visit(`${TEST_URL}/recursion`);
  });

  afterEach(() => {
    cy.get(`[data-test-id=${TEST_ID_STRING_INPUT}]`).clear().should('be.empty');
  });


  it('Кнопка должна быть заблокирована при пустом инпуте', () => {
    cy.get(`[data-test-id=${TEST_ID_STRING_INPUT}]`).should('be.empty');
    cy.get(`[data-test-id=${TEST_ID_STRING_BUTTON}]`).should('be.disabled');
  });

  it('Кнопка должна быть не заблокирована при заполненном инпуте', () => {
    cy.get(`[data-test-id=${TEST_ID_STRING_INPUT}]`).type('string').should('have.value', 'string');
    cy.get(`[data-test-id=${TEST_ID_STRING_BUTTON}]`).should('not.be.disabled');
  });

  it('Кнопка должна быть заблокирована при пустом инпуте', () => {
    cy.get(`[data-test-id=${TEST_ID_STRING_INPUT}]`).type('string');
    cy.get(`[data-test-id=${TEST_ID_STRING_BUTTON}]`).click();

    cy.get('[class^=circle_circle]').as('circle');

    cy.get('@circle')
      .each((el, index) => {
        if (index === 0 || index === 5) {
          cy.wrap(el).should(
            'have.css',
            'border',
            '4px solid rgb(210, 82, 225)'
          );
        }
        if (index > 0 && index < 5) {
          cy.wrap(el).should(
            'have.css',
            'border',
            '4px solid rgb(0, 50, 255)'
          );
        }
        if (index === 0) expect(el).to.contain('s');
        if (index === 5) expect(el).to.contain('g');
      });

    cy.wait(DELAY_IN_MS);

    cy.get('@circle')
      .each((el, index) => {
        if (index < 1 || index > 4) {
          cy.wrap(el).should(
            'have.css',
            'border',
            '4px solid rgb(127, 224, 81)'
          );
        }
        if (index === 1 || index === 4) {
          cy.wrap(el).should(
            'have.css',
            'border',
            '4px solid rgb(210, 82, 225)'
          );
        }
        if (index > 1 && index < 4) {
          cy.wrap(el).should(
            'have.css',
            'border',
            '4px solid rgb(0, 50, 255)'
          );
        }
        if (index === 1) expect(el).to.contain('t');
        if (index === 4) expect(el).to.contain('n');
      });

    cy.wait(DELAY_IN_MS);

    cy.get('@circle')
      .each((el, index) => {
        if (index < 2 || index > 3) {
          cy.wrap(el).should(
            'have.css',
            'border',
            '4px solid rgb(127, 224, 81)'
          );
        }
        if (index === 2 || index === 3) {
          cy.wrap(el).should(
            'have.css',
            'border',
            '4px solid rgb(210, 82, 225)'
          );
        }
        if (index === 2) expect(el).to.contain('r');
        if (index === 3) expect(el).to.contain('i');
      });

    cy.wait(DELAY_IN_MS);

    cy.get('@circle')
      .each((el, index) => {
        cy.wrap(el).should(
          'have.css',
          'border',
          '4px solid rgb(127, 224, 81)'
        );

        if (index === 0) expect(el).to.contain('g');
        if (index === 1) expect(el).to.contain('n');
        if (index === 2) expect(el).to.contain('i');
        if (index === 3) expect(el).to.contain('r');
        if (index === 4) expect(el).to.contain('t');
        if (index === 5) expect(el).to.contain('s');

      });
  });
});
