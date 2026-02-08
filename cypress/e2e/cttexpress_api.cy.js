/// <reference types="cypress" />
import 'cypress-plugin-api';

describe('JSONPlaceholder API - Example Test', () => {
  it('should return 200 and a list of posts', () => {
      cy.api({ method: 'GET', url: '/get' }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('url');
        expect(response.body).to.have.property('headers');
      });
  });
});
