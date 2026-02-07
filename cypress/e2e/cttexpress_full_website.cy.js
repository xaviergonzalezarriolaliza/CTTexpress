const { HomePage } = require('./pages/HomePage');
const { ContactPage } = require('./pages/ContactPage');

// Prevent Cypress from failing tests due to uncaught exceptions from external scripts
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false prevents Cypress from failing the test
  return false;
});

describe('CTTexpress Full Website Smoke Test', () => {

  const home = new HomePage();
  const contact = new ContactPage();

  beforeEach(() => {
    // Accept cookies or close popups if present
    cy.visit('https://www.cttexpress.com');

    // Try to click 'Aceptar' if it appears, but do not fail if not found
    cy.get('button, input[type="button"], input[type="submit"]', { timeout: 2000 }).then($els => {
      const aceptarBtn = Array.from($els).find(el =>
        el.innerText && el.innerText.toLowerCase().includes('aceptar')
      );
      if (aceptarBtn) {
        cy.wrap(aceptarBtn).as('aceptarBtn');
        cy.get('@aceptarBtn').click({ force: true });
      }
    });
  });

  it('should display the main menu on the homepage', () => {
    cy.visit('https://www.cttexpress.com');
    cy.get('nav').should('be.visible');
      cy.get('nav a').should('have.length.greaterThan', 0); // Assert menu has links
      cy.get('nav').should('contain.text', 'Envíos'); // Assert menu contains expected text
  });

  it('should load the homepage and have a title that contains CTT', () => {
    cy.visit('https://www.cttexpress.com');
    cy.title().should('include', 'CTT');
      cy.get('body').should('be.visible'); // Assert body is visible
      cy.url().should('include', 'cttexpress'); // Assert URL contains domain
  });

  it('should have a visible body element', () => {
    cy.visit('https://www.cttexpress.com');
    cy.get('body').should('be.visible');
      cy.get('body').should('not.be.empty'); // Assert body is not empty
  });

  // Minimal: Just click the submenu link under Envíos para empresas and check the body is visible
  it('should click the Envíos para empresas submenu link and see the page', () => {
    cy.visit('https://www.cttexpress.com');
    cy.get('a[href="/envios/"]').first().trigger('mouseover');
    cy.get('a[href="/envios/"]').parent().find('ul a').first().click({ force: true });
    cy.get('body').should('be.visible');
      cy.url().should('include', '/envios'); // Assert URL changed to envios
      cy.get('body').should('not.be.empty'); // Assert body is not empty
  });

  // Minimal: Just click the submen link under Envíos para particulares and check the body is visible
  it('should click the Envios para particulares submenu link and see the page', () => {
    cy.visit('https://www.cttexpress.com');
    cy.get('a[role="link"][aria-disabled="true"]').first().trigger('mouseover');
    cy.get('a[role="link"][aria-disabled="true"]').first().parent().find('ul a').first().click({ force: true });
    cy.get('body').should('be.visible');
    cy.url().should('include', '/servicios'); // Assert URL changed to servicios (actual result)
    cy.get('body').should('not.be.empty'); // Assert body is not empty
  });

});

// TODO: CI/CD, awesome report?, same with TS and python?
