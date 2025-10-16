const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");
require("dotenv").config();

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter", // 👈 agrega esto (reporter global)
  reporterOptions: {
  reportDir: "reports/mochawesome/.jsons",  // 👈 ahora se guardan los .json acá
    overwrite: false,
    html: true,
    json: true,
  },

  e2e: {
    specPattern: "cypress/e2e/features/**/*.feature",

    async setupNodeEvents(on, config) {
      // Configura el preprocesador Cucumber
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      // Configura el reporter (Mochawesome)
      require("cypress-mochawesome-reporter/plugin")(on);

      return config;
    },

    baseUrl: process.env.FRONTEND_URL || "http://localhost:5173",
    supportFile: "cypress/support/e2e.js",
    viewportWidth: 1280,
    viewportHeight: 800,
  },
});
