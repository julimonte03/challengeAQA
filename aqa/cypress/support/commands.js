Cypress.Commands.add("loginUi", (username = "testuser", password = "Password123") => {
  cy.visit('/login');
  cy.get('[data-cy=username]').type(username);
  cy.get('[data-cy=password]').type(password);
  cy.get('[data-cy=login-button]').click();
});

Cypress.Commands.add("seedMessages", (messages = []) => {
  // Seedea mensajes directamente por API para preparar escenarios
  messages.forEach(m =>
    cy.request('POST', 'http://localhost:4000/api/messages', m)
  );
});
