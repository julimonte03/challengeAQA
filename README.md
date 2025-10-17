-AQA Challenge - Chat Room App

-Overview

This project is a simple Chat Room App where users can log in and send messages in real time.  

---

-Features

- User login and logout  
- Send and display chat messages  
- Input validation for empty messages  
- Backend and frontend integration  
- Automated end-to-end testing with Cypress  
- HTML reporting with Mochawesome  

---

-Tech Stack

- Frontend: React + React Router  
- Backend: Node.js + Express  
- Database: MongoDB  
- Testing: Cypress + Cucumber + Mochawesome Reporter  

---

-Getting Started

-Installation

---------------------GitHub Cloning-------------------------------

git clone https://github.com/julimonte03/challengeAQA.git
cd aqa-challenge

---------------------Running the App-------------------------------
Start the backend:

cd backend
npm install

aqa-challenge\backend -> run        npm start

---------------------Start the frontend (in another terminal)-------------------------------

cd frontend
npm install

aqa-challenge\frontend -> run      npm run dev


--------------------------------------------------------------------------------------------

The app will be available at http://localhost:5173
The backend runs at http://localhost:4000

---------------------Running tests (in another terminal)-------------------------------

cd aqa
npm install
npm install --save-dev cypress @badeball/cypress-cucumber-preprocessor @bahmutov/cypress-esbuild-preprocessor mochawesome mochawesome-merge mochawesome-report-generator dotenv



To execute the automated tests:

aqa-challenge\aqa -> run           npm run test

to see the tests running in real time:
                     run           npm run cypress:open


This will run all login and chat feature tests and generate reports inside

---------------------Implemented and Planned Tests-------------------------------

Some tests were planned but not implemented due to time constraints.
The test infrastructure is fully prepared for easy future additions:


| Module  | Test Case                      | Status      
| ------- | ------------------------------ | --------- 
| Login   | Valid credentials              |done      |
| Login   | Invalid credentials            |done      |
| Login   | Empty fields                   |done      |
| Chat    | Send valid message             |done      |
| Chat    | Empty message                  |done      |
| Chat    | Very long message              |(planned) |
| Chat    | Load previous messages         |(planned) |
| Chat    | Refresh and keep messages      |(planned) |
| Chat    | Two-user interaction           |(planned) |
| Chat    | Send multiple messages quickly |(planned) |
| Backend | Validate message saved in DB   |(planned) |
| Backend | Reject invalid login           |done      |
| Backend | Accept valid login             |done      |
| Backend | Reset DB via `/test/reset`     |(planned) |



---------------------How to use-------------------------------

Open the app in your browser.

Log in with a test user (for example: testuser / Password123).

Send a message and check that it appears in the chat.

---------------------Run Everything with One Command -------------------------------
backend + frontend + tests using concurrently


\aqa-challenge -> run        npm install -D concurrently
                  run         npm run all

                  






