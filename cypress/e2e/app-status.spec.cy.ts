import { TEST_URL } from '../../src/constants/tests/general';

describe('Приложение доступно', () => {

  it(`Приложение открыто на правильном порте - ${ TEST_URL }`, () => {
    cy.visit(TEST_URL);
  });
});
