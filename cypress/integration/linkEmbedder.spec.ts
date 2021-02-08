/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

describe('links to embeddable content', () => {
  beforeEach(() => {
    cy.visitTestEditor()
  })

  it('GitHub Gist', () => {
    cy.codemirrorFill('https://gist.github.com/schacon/1')
    cy.getMarkdownBody()
      .find('span.one-click-embedding.gist-frame')
      .click()
    cy.getMarkdownBody()
      .find('iframe')
      .should('have.attr', 'title', 'gist schacon/1')
  })

  it('YouTube', () => {
    cy.codemirrorFill('https://www.youtube.com/watch?v=YE7VzlLtp-4')
    cy.getMarkdownBody()
      .find('span.one-click-embedding.embed-responsive-item')
      .click()
    cy.getMarkdownBody()
      .find('iframe')
      .should('have.attr', 'src', 'https://www.youtube-nocookie.com/embed/YE7VzlLtp-4?autoplay=1')
  })

  it('Vimeo', () => {
    cy.codemirrorFill('https://vimeo.com/23237102')
    cy.getMarkdownBody()
      .find('span.one-click-embedding.embed-responsive-item')
      .click()
    cy.getMarkdownBody()
      .find('iframe')
      .should('have.attr', 'src', 'https://player.vimeo.com/video/23237102?autoplay=1')
  })

  it('Asciinema', () => {
    cy.codemirrorFill('https://asciinema.org/a/117928')
    cy.getMarkdownBody()
      .find('span.one-click-embedding.embed-responsive-item')
      .click()
    cy.getMarkdownBody()
      .find('iframe')
      .should('have.attr', 'src', 'https://asciinema.org/a/117928/embed?autoplay=1')
  })
})
