Feature: Chat messages
  As a logged in user
  I want to send and view messages
  So that I can chat with others

  Scenario: Send a message and see it in history
    Given the database has the following messages:
      | user     | text               |
      | otherOne | Hola a todos       |
    And I am logged in as "testuser"
    When I send message "Hola desde Cypress"
    Then I should see "Hola desde Cypress" in the message list
    And I should see "Hola a todos" in the message list

  Scenario: Reject empty message
    Given I am logged in as "testuser"
    When I try to send an empty message
    Then the message should not be sent
