/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { RendererType } from '../../src/components/render-page/window-post-message-communicator/rendering-message'

declare namespace Cypress {
  interface Chainable {
    getIframeBody(rendererType?: RendererType): Chainable<Element>

    getIframeWindow(rendererType?: RendererType): Chainable<Window>

    getReveal(): Chainable<Element>

    getMarkdownBody(): Chainable<Element>
  }
}

Cypress.Commands.add('getIframeWindow', (rendererType?: RendererType) => {
  const renderTypeAttribute = rendererType ? `[data-cypress-renderer-type="${rendererType}"]` : ''
  return cy
    .get(`iframe[data-cypress-id="documentIframe"][data-cypress-renderer-ready="true"]${renderTypeAttribute}`)
    .should('be.visible')
    .its('0.contentWindow')
    .should('exist')
    .then(cy.wrap.bind(cy))
})

Cypress.Commands.add('getIframeBody', (rendererType?: RendererType) => {
  return cy
    .getIframeWindow(rendererType)
    .its('document')
    .should('exist')
    .its('body')
    .should('not.be.undefined')
    .then(cy.wrap.bind(cy))
})

Cypress.Commands.add('getReveal', () => {
  return cy.getIframeBody(RendererType.SLIDESHOW).find('.reveal')
})

Cypress.Commands.add('getMarkdownBody', () => {
  return cy.getIframeBody(RendererType.DOCUMENT).findByCypressId('markdown-body')
})

Cypress.Commands.add('getIntroBody', () => {
  return cy.getIframeBody(RendererType.INTRO).findByCypressId('markdown-body')
})
