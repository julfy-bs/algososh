import * as constants from '../../src/constants/tests/general';
import * as routes from '../../src/constants/tests/routes';

describe('Ссылки с главной страницы работают и ведут', () => {
  beforeEach(() => {
    cy.visit(constants.TEST_URL);
  });

  afterEach(() => {
    cy.get(routes.LINK_HOME_PAGE).click();
  });

  it('на роут "/recursion"', () => {
    cy.get(routes.LINK_STRING_PAGE).click();
    cy.contains(routes.TITLE_CONTENT_STRING_TEST_ID);
  });

  it('на роут "/fibonacci"', () => {
    cy.get(routes.LINK_FIBONACCI_PAGE).click();
    cy.contains(routes.TITLE_CONTENT_FIBONACCI_TEST_ID);
  });

  it('на роут "/sorting"', () => {
    cy.get(routes.LINK_ARRAY_PAGE).click();
    cy.contains(routes.TITLE_CONTENT_ARRAY_TEST_ID);
  });

  it('на роут "/stack"', () => {
    cy.get(routes.LINK_STACK_PAGE).click();
    cy.contains(routes.TITLE_CONTENT_STACK_TEST_ID);
  });

  it('на роут "/queue"', () => {
    cy.get(routes.LINK_QUEUE_PAGE).click();
    cy.contains(routes.TITLE_CONTENT_QUEUE_TEST_ID);
  });

  it('на роуте "/list"', () => {
    cy.get(routes.LINK_LIST_PAGE).click();
    cy.contains(routes.TITLE_CONTENT_LINKED_LIST_TEST_ID);
  });
});
