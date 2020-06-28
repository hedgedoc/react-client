Cypress.Commands.add('logout', () => {
  cy.get('#dropdown-user').click()
  cy.get('.fa-sign-out').click()
})
