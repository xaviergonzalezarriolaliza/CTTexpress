const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    pageLoadTimeout: 180000, // Increase timeout to 3 minutes
    reporterOptions: {
      reportDir: "cypress/results",
      overwrite: false,
      html: true,
      json: true,
      reportFilename: `report-${new Date().toISOString().replace(/[:.]/g, '-')}`
    }
  },
});
