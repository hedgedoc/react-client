/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to get the value of a style property of the before-pseudo-element of an element.
     * @example cy.get(input).fill('content')
     */
    styleValueOfBefore (property: string): Chainable<Element>
  }
}

function unquote(value: string): string {
  return value.replace(/(^")|("$)/g, '');
}

Cypress.Commands.add(
  'styleValueOfBefore',
  {
    prevSubject: 'element',
  }, (subject: JQuery, property: string) => {
    const elementWindow = subject[0].ownerDocument.defaultView as Window;
    const before = elementWindow.getComputedStyle(subject[0], 'before');
    return cy.wrap(unquote(before.getPropertyValue(property)));
  },
);
