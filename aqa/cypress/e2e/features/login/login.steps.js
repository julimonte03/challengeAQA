import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on the login page", () => {
  cy.visit("/login");
});

When("I enter username {string} and password {string}", (username, password) => {
  cy.get('[data-cy="username"]').type(username);
  cy.get('[data-cy="password"]').type(password);
});

When("I click the login button", () => {
  cy.get('[data-cy="login-button"]', { timeout: 10000 }).click();
});

Then("I should see the chat page", () => {
  cy.url({ timeout: 10000 }).should("include", "/chat");
  cy.get('[data-cy="welcome"]').should("be.visible");
});

Then("I should see a welcome message containing {string}", (username) => {
  cy.get('[data-cy="welcome"]').should("contain", username);
});

Then("I should see an error message {string}", (message) => {
  cy.get('[data-cy="error"]').should("contain", message);
});

