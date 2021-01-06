
/*
 * SPDX-FileCopyrightText: 2020 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to check an external Link.
     * @example cy.get(a#extern).checkExternalLink('http://example.com')
     */
    fill (value: string): Chainable<Element>
  }
}

// in your commands file:
Cypress.Commands.add('fill', {
  prevSubject: 'element'
}, (subject, value) => {
  cy.wrap(subject).invoke('val', value)
  .trigger('change', {force: true})
});
