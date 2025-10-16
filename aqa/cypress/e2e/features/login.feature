Feature: Login
  As an existing user
  I want to login with username and password
  So that I can access chat

  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter username "testuser" and password "Password123"
    And I click the login button
    Then I should see the chat page
    And I should see a welcome message containing "testuser"

  Scenario: Failed login with invalid credentials
    Given I am on the login page
    When I enter username "baduser" and password "wrong"
    And I click the login button
    Then I should see an error message "Invalid credentials"

