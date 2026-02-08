const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
      reporterOptions: {
        reportDir: "cypress/results",
        overwrite: false,
        html: true,
        json: true,
        reportFilename: `report-${new Date().toISOString().replace(/[:.]/g, '-')}`
      }
  },
});
