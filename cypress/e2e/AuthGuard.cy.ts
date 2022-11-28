import { expiredUser } from "../../src/mocks/data/ExpiredUser";

const routes = ["", "profile", "admin"];

describe("AuthGuard (no credentials)", () => {
  it("redirects to /login if user is not logged in", () => {
    routes.forEach((route) => {
      cy.visit(Cypress.env("frontEndUrl") + route);
      cy.url().should("be.equal", Cypress.env("frontEndUrl") + "login");
    });
  });
});

describe("AuthGuard (wrong credentials)", () => {
  before(() => {
    localStorage.setItem("user", "completely-wrong");
  });
  it("redirects to /login if user has wrong login", () => {
    routes.forEach((route) => {
      cy.visit(Cypress.env("frontEndUrl") + route);
      cy.url().should("be.equal", Cypress.env("frontEndUrl") + "login");
    });
  });
});

describe("AuthGuard (expired credentials)", () => {
  before(() => {
    localStorage.setItem("user", JSON.stringify(expiredUser));
  });
  it("redirects to /login if user has expired login", () => {
    cy.intercept({
      method: "POST",
      url: Cypress.env("proxyUrl") + "auth/refresh/",
    }).as("refresh");

    // visit home where an auto-request takes place
    cy.visit(Cypress.env("frontEndUrl"));

    // expect it to hit the refresh url and get a 401 back
    cy.wait("@refresh").its("response.statusCode").should("eq", 401);

    // finally it should redirect to login
    cy.url().should("be.equal", Cypress.env("frontEndUrl") + "login");
  });
});
