const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: true,

  e2e: {
    baseUrl: 'https://httpbin.org',
    setupNodeEvents(on, config) {
    },
    pageLoadTimeout: 180000, 
    reporterOptions: {
      reportDir: "cypress/results",
      overwrite: false,
      html: true,
      json: true,
      reportFilename: `report-${new Date().toISOString().replace(/[:.]/g, '-')}`
    }
  },
});
