const { HomePage } = require('./pages/HomePage');
const { ContactPage } = require('./pages/ContactPage');

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('CTTexpress Form Field Discovery', () => {
  beforeEach(() => {
    cy.visit('https://www.cttexpress.com');
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

  it.skip('should find the page with the most input fields in the domain', () => {
    // Skipped as page is already detected
  });

  it('should perform best coverage testing for the page with most input fields', () => {
    cy.visit('https://www.cttexpress.com/red-collectt-express/envio-y-recogida');
    cy.get('input, textarea, select').should('have.length.greaterThan', 0);
    cy.get('input[type="text"]:visible').then($els => {
      if ($els.length > 0) {
        cy.wrap($els).each(($el, idx) => {
          cy.wrap($el).clear().type(`Sample Text ${idx}`);
        });
      }
    });
    cy.get('body').then($body => {
      const emailFields = $body.find('input[type="email"]:visible');
      if (emailFields.length > 0) {
        cy.wrap(emailFields).each(($el, idx) => {
          cy.wrap($el).clear().type(`test${idx}@example.com`);
        });
      }
    });
    cy.get('body').then($body => {
      const telFields = $body.find('input[type="tel"]:visible');
      if (telFields.length > 0) {
        cy.wrap(telFields).each(($el, idx) => {
          cy.wrap($el).clear().type(`123456789${idx}`);
        });
      }
    });
    cy.get('body').then($body => {
      const numberFields = $body.find('input[type="number"]:visible');
      if (numberFields.length > 0) {
        cy.wrap(numberFields).each(($el, idx) => {
          cy.wrap($el).clear().type(`${idx + 1}`);
        });
      }
    });
    cy.get('body').then($body => {
      const textareaFields = $body.find('textarea:visible');
      if (textareaFields.length > 0) {
        cy.wrap(textareaFields).each(($el, idx) => {
          cy.wrap($el).clear().type(`Sample textarea ${idx}`);
        });
      }
      const selectFields = $body.find('select:visible');
      if (selectFields.length > 0) {
        cy.wrap(selectFields).each(($el, idx) => {
          const $options = $el.find('option');
          if ($options.length > 0) {
            const firstValid = $options.filter((i, opt) => !opt.disabled && opt.value).first();
            if (firstValid.length > 0) {
              cy.wrap($el).select(firstValid.val());
            }
          }
        });
      }
    });
    cy.get('form').then($form => {
      if ($form.length > 0) {
        cy.get('input[type="submit"], button[type="submit"]').first().click({ force: true });
        cy.get('body').should('be.visible');
      }
    });
  });
});

describe('CTTexpress Full Website Smoke Test', () => {
  const home = new HomePage();
  const contact = new ContactPage();

  beforeEach(() => {
    cy.visit('https://www.cttexpress.com');
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
    cy.get('nav a').should('have.length.greaterThan', 0);
    cy.get('nav').should('contain.text', 'Envíos');
  });

  it('should load the homepage and have a title that contains CTT', () => {
    cy.visit('https://www.cttexpress.com');
    cy.title().should('include', 'CTT');
    cy.get('body').should('be.visible');
    cy.url().should('include', 'cttexpress');
  });

  it('should have a visible body element', () => {
    cy.visit('https://www.cttexpress.com');
    cy.get('body').should('be.visible');
    cy.get('body').should('not.be.empty');
  });

  it('should click the Envíos para empresas submenu link and see the page', () => {
    cy.visit('https://www.cttexpress.com');
    cy.get('a[href="/envios/"]').first().trigger('mouseover');
    cy.get('a[href="/envios/"]').parent().find('ul a').first().click({ force: true });
    cy.get('body').should('be.visible');
    cy.url().should('include', '/envios');
    cy.get('body').should('not.be.empty');
  });

  it('should click the Envios para particulares submenu link and see the page', () => {
    cy.visit('https://www.cttexpress.com');
    cy.get('a[role="link"][aria-disabled="true"]').first().trigger('mouseover', { force: true });
    cy.get('a[role="link"][aria-disabled="true"]').first().parent().find('ul a').first().click({ force: true });
    cy.get('body').should('be.visible');
    cy.url().should('include', '/servicios');
    cy.get('body').should('not.be.empty');
  });

  it('should display the shipping calculator iframe on the calculator page', () => {
    cy.visit('https://www.cttexpress.com/servicios/particulares/calcular-envio');
    cy.get('iframe').should('be.visible');
  });
});

// TODO: CI/CD, awesome report?, same with TS and python?