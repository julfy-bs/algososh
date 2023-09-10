/// <reference types="cypress" />

describe("Приложение доступно", () => {
  it("Приложение открыто на localhost:3000", () => {
    cy.visit("http://localhost:3000");
  });
});

export {};
