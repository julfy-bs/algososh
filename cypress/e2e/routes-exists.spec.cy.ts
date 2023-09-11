import * as constants from '../../src/constants/test';

describe('Ссылки с главной страницы работают и ведут', () => {
  beforeEach(() => {
    cy.visit(constants.TEST_URL);
  });

  afterEach(() => {
    cy.get(`[data-test-id=${constants.TEST_ID_HOMEPAGE_BTN}]`).click();
  });

  it('на роут "/recursion"', () => {
    cy.get(`[data-test-id="${constants.TEST_ID_CARD_STRING}"]`).click();
    cy.contains(constants.TEST_ID_TITLE_STRING);
  });

  it('на роут "/fibonacci"', () => {
    cy.get(`[data-test-id="${constants.TEST_ID_CARD_FIB}"]`).click();
    cy.contains(constants.TEST_ID_TITLE_FIB);
  });

  it('на роут "/sorting"', () => {
    cy.get(`[data-test-id="${constants.TEST_ID_CARD_SORTING}"]`).click();
    cy.contains(constants.TEST_ID_TITLE_ARRAY);
  });

  it('на роут "/stack"', () => {
    cy.get(`[data-test-id="${constants.TEST_ID_CARD_STACK}"]`).click();
    cy.contains(constants.TEST_ID_TITLE_STACK);
  });

  it('на роут "/queue"', () => {
    cy.get(`[data-test-id="${constants.TEST_ID_CARD_QUEUE}"]`).click();
    cy.contains(constants.TEST_ID_TITLE_QUEUE);
  });

  it('на роуте "/list"', () => {
    cy.get(`[data-test-id="${constants.TEST_ID_CARD_LIST}"]`).click();
    cy.contains(constants.TEST_ID_TITLE_LIST);
  });
});
