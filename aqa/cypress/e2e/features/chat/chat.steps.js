import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("the database has the following messages:", (dataTable) => {
  const messages = dataTable.hashes();
  cy.request({
    method: "POST",
    url: "http://localhost:4000/test/reset",
    body: { messages },
    failOnStatusCode: false
  });
});

Given("I am logged in as {string}", (username) => {
  cy.visit("/login");
  cy.get('[data-cy="username"]').type(username);
  cy.get('[data-cy="password"]').type("Password123");
  cy.get('[data-cy="login-button"]', { timeout: 10000 }).click();
  cy.url({ timeout: 10000 }).should("include", "/chat");
});

When("I send message {string}", (message) => {
  cy.get('[data-cy="message-input"]').type(message);
  cy.get('[data-cy="send-button"]').click();
});

Then("I should see {string} in the message list", (message) => {
  cy.get('[data-cy="messages"]').should("contain", message);
});

When("I try to send an empty message", () => {
  cy.get('[data-cy="send-button"]').click();
});

Then("the message should not be sent", () => {
  cy.get('[data-cy="messages"]').then(($list) => {
    const initialCount = $list.children().length;
    cy.wait(500);
    cy.get('[data-cy="messages"]').children().should("have.length", initialCount);
  });
});

When("I try to send message {string}", (msg) => {
cy.get('[data-cy="message-input"]').type(msg);
cy.get('[data-cy="send-button"]').click();
});

Then("the message input should be empty", () => {
cy.get('[data-cy="message-input"]').should("have.value", "");
});

Then("the message {string} should appear before {string}", (first, second) => {
cy.get('[data-cy="message-list"]').then(($list) => {
const firstIndex = $list.text().indexOf(first);
const secondIndex = $list.text().indexOf(second);
expect(firstIndex).to.be.lessThan(secondIndex);
});
});

When("I refresh the page", () => {
cy.reload();
});
