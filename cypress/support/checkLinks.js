Cypress.Commands.add('checkExternalLink', { prevSubject: 'element' }, (element, url) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  cy.get(element.selector).should('have.attr', 'href', url)
    .should('have.attr', 'target', '_blank')
})
