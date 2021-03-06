/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

describe('Test word count with', () => {
  beforeEach(() => {
    cy.visitTestEditor()
  })

  it('empty note', () => {
    cy.codemirrorFill('')
    cy.wait(500)
    cy.get('[data-cy="sidebar-btn-document-info"]').click()
    cy.get('[data-cy="document-info-modal"]').should('be.visible')
    cy.get('[data-cy="document-info-word-count"]').should('have.text', '0')
  })

  it('simple words', () => {
    cy.codemirrorFill('five words should be enough')
    cy.wait(500)
    cy.get('[data-cy="sidebar-btn-document-info"]').click()
    cy.get('[data-cy="document-info-modal"]').should('be.visible')
    cy.get('[data-cy="document-info-word-count"]').should('have.text', '5')
  })

  it('excluded codeblocks', () => {
    cy.codemirrorFill('```\nthis is should be ignored\n```\n\ntwo `words`')
    cy.wait(500)
    cy.get('[data-cy="sidebar-btn-document-info"]').click()
    cy.get('[data-cy="document-info-modal"]').should('be.visible')
    cy.get('[data-cy="document-info-word-count"]').should('have.text', '2')
  })

  it('excluded images', () => {
    cy.codemirrorFill('![ignored alt text](https://dummyimage.com/48) not ignored text')
    cy.wait(500)
    cy.get('[data-cy="sidebar-btn-document-info"]').click()
    cy.get('[data-cy="document-info-modal"]').should('be.visible')
    cy.get('[data-cy="document-info-word-count"]').should('have.text', '3')
  })
})
