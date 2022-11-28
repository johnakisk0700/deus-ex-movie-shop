// cy.intercept({
//   method: "POST",
//   url: Cypress.env("backendUrl") + "auth/login/",
// }).as("login");

describe("Login and AuthProvider", () => {
  it("should login user, redirect him to where he wanted to go, also block him from admin route", () => {
    cy.visit(Cypress.env("frontEndUrl") + "profile");
    cy.url().should("be.equal", Cypress.env("frontEndUrl") + "login");

    cy.get("#username").type(Cypress.env("dummyUsername"));
    cy.get("#password").type(Cypress.env("dummyPassword"));
    cy.get("#submit-login").click();

    cy.url().should("be.equal", Cypress.env("frontEndUrl") + "profile");

    cy.visit(Cypress.env("frontEndUrl") + "admin");
    cy.url().should("be.equal", Cypress.env("frontEndUrl"));
  });

  it("should give admin users access to admin routes", () => {
    cy.visit(Cypress.env("frontEndUrl") + "admin");
    cy.url().should("be.equal", Cypress.env("frontEndUrl") + "login");

    cy.get("#username").type(Cypress.env("dummyAdminUsername"));
    cy.get("#password").type(Cypress.env("dummyAdminPassword"));
    cy.get("#submit-login").click();

    cy.url().should("be.equal", Cypress.env("frontEndUrl") + "admin");
  });
});
