import * as string from '../../src/constants/tests/string';
import * as circle from '../../src/constants/tests/circle';
import { hexToRgb } from '../../src/helpers/hexToRgb';
import { TEST_URL } from '../../src/constants/tests/general';
import { DELAY_IN_MS } from '../../src/constants/delays';
import { COLOR_CHANGING, COLOR_DEFAULT, COLOR_MODIFIED } from '../../src/constants/colors';


describe('Страница визуализации алгоритма строки', () => {

  beforeEach(() => {
    cy.visit(`${ TEST_URL }/recursion`);
  });

  afterEach(() => {
    cy.get(string.inputElement).clear().should('be.empty');
  });


  it('Кнопка должна быть заблокирована при пустом инпуте', () => {
    cy.get(string.inputElement).should('be.empty');
    cy.get(string.buttonElement).should('be.disabled');
  });

  it('Кнопка должна быть не заблокирована при заполненном инпуте', () => {
    cy.get(string.inputElement).type('string').should('have.value', 'string');
    cy.get(string.buttonElement).should('not.be.disabled');
  });

  it('Анимация выполняется корректно cо строкой с четным количеством символов', () => {
    cy.get(string.inputElement).type('string');
    cy.get(string.buttonElement).click();

    cy.get(circle.Circle).as('circle');

    cy.get('@circle')
      .each((el: Element, index: number) => {
        if (index === 0 || index === 5) {
          cy.wrap(el).should(
            'have.css',
            'border',
            `4px solid ${ hexToRgb(COLOR_CHANGING) }`
          );
        }
        if (index > 0 && index < 5) {
          cy.wrap(el).should(
            'have.css',
            'border',
            `4px solid ${ hexToRgb(COLOR_DEFAULT) }`
          );
        }
        if (index === 0) expect(el).to.contain('s');
        if (index === 5) expect(el).to.contain('g');
      });

    cy.wait(DELAY_IN_MS);

    cy.get('@circle')
      .each((el: Element, index: number) => {
        if (index < 1 || index > 4) {
          cy.wrap(el).should(
            'have.css',
            'border',
            `4px solid ${ hexToRgb(COLOR_MODIFIED) }`
          );
        }
        if (index === 1 || index === 4) {
          cy.wrap(el).should(
            'have.css',
            'border',
            `4px solid ${ hexToRgb(COLOR_CHANGING) }`
          );
        }
        if (index > 1 && index < 4) {
          cy.wrap(el).should(
            'have.css',
            'border',
            `4px solid ${ hexToRgb(COLOR_DEFAULT) }`
          );
        }
        if (index === 1) expect(el).to.contain('t');
        if (index === 4) expect(el).to.contain('n');
      });

    cy.wait(DELAY_IN_MS);

    cy.get('@circle')
      .each((el: Element, index: number) => {
        if (index < 2 || index > 3) {
          cy.wrap(el).should(
            'have.css',
            'border',
            `4px solid ${ hexToRgb(COLOR_MODIFIED) }`
          );
        }
        if (index === 2 || index === 3) {
          cy.wrap(el).should(
            'have.css',
            'border',
            `4px solid ${ hexToRgb(COLOR_CHANGING) }`
          );
        }
        if (index === 2) expect(el).to.contain('r');
        if (index === 3) expect(el).to.contain('i');
      });

    cy.wait(DELAY_IN_MS);

    cy.get('@circle')
      .each((el: Element, index: number) => {
        cy.wrap(el).should(
          'have.css',
          'border',
          `4px solid ${ hexToRgb(COLOR_MODIFIED) }`
        );

        if (index === 0) expect(el).to.contain('g');
        if (index === 1) expect(el).to.contain('n');
        if (index === 2) expect(el).to.contain('i');
        if (index === 3) expect(el).to.contain('r');
        if (index === 4) expect(el).to.contain('t');
        if (index === 5) expect(el).to.contain('s');

      });
  });

  it('Анимация выполняется корректно cо строкой с нечетным количеством символов', () => {
    cy.get(string.inputElement).type('hit');
    cy.get(string.buttonElement).click();

    cy.get(circle.Circle).as('circle');

    cy.get('@circle')
      .each((el: Element, index: number) => {
        if (index === 0 || index === 2) {
          cy.wrap(el).should(
            'have.css',
            'border',
            `4px solid ${ hexToRgb(COLOR_CHANGING) }`
          );
        }
        if (index > 0 && index < 2) {
          cy.wrap(el).should(
            'have.css',
            'border',
            `4px solid ${ hexToRgb(COLOR_DEFAULT) }`
          );
        }
        if (index === 0) expect(el).to.contain('h');
        if (index === 5) expect(el).to.contain('t');
      });

    cy.wait(DELAY_IN_MS);

    cy.get('@circle')
      .each((el: Element, index: number) => {
        if (index < 1 || index > 1) {
          cy.wrap(el).should(
            'have.css',
            'border',
            `4px solid ${ hexToRgb(COLOR_MODIFIED) }`
          );
        }
        if (index === 1) {
          cy.wrap(el).should(
            'have.css',
            'border',
            `4px solid ${ hexToRgb(COLOR_CHANGING) }`
          );
        }
        if (index === 1) expect(el).to.contain('i');
      });

    cy.wait(DELAY_IN_MS);

    cy.get('@circle')
      .each((el: Element, index: number) => {
        cy.wrap(el).should(
          'have.css',
          'border',
          `4px solid ${ hexToRgb(COLOR_MODIFIED) }`
        );

        if (index === 0) expect(el).to.contain('t');
        if (index === 1) expect(el).to.contain('i');
        if (index === 2) expect(el).to.contain('h');
      });
  });
});
