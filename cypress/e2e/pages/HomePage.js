class HomePage {
  visit() {
    cy.visit('https://www.cttexpress.com');
  }
  getMenu() {
    return cy.get('nav');
  }
  getBanner() {
    return cy.get('.main-banner, .hero, .banner');
  }
  getFooter() {
    return cy.get('footer');
  }
  getContactLink() {
    return cy.contains('a', 'Contacto');
  }
  getTrackingInput() {
    return cy.get('input[name*="tracking"], input[placeholder*="seguimiento"]');
  }
  getTrackingButton() {
    return cy.get('button, input[type="submit"]').contains(/(Buscar|Track|Seguimiento)/i);
  }
  getMenuLinks() {
    return cy.get('nav a').filter(':visible');
  }
}
module.exports = { HomePage };
