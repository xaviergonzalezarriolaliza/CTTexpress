class ContactPage {
  visit() {
    cy.visit('https://www.cttexpress.com/contacto');
  }
  getContactForm() {
    return cy.get('form');
  }
  getNameInput() {
    return cy.get('input[name*="name"], input[placeholder*="nombre"]');
  }
  getEmailInput() {
    return cy.get('input[type="email"]');
  }
  getMessageInput() {
    return cy.get('textarea');
  }
  getSubmitButton() {
    return cy.get('button, input[type="submit"]');
  }
}
module.exports = { ContactPage };
