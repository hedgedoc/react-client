/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

/* eslint-disable @typescript-eslint/no-unsafe-call */
describe('Intro', () => {
  beforeEach(() => {
    cy.intercept("/intro.md", "test content")
    cy.visit('/')
  })

  describe('Intro page fetch', () => {
    it('fetches the intro page content', () => {
      cy.getMarkdownBody()
        .contains('test content')
    })
  })

  describe('Cover Button are hidden when logged in', () => {
    it('Sign in Cover Button', () => {
      cy.get('.cover-button.btn-success')
        .should('not.exist')
    })

    it('Features Cover Button', () => {
      cy.get('.cover-button.btn-primary')
        .should('not.exist')
    })
  })

  describe('Cover Button are shown when logged out', () => {
    beforeEach(() => {
      cy.logout()
    })

    it('Sign in Cover Button', () => {
      cy.get('.cover-button.btn-success')
        .should('exist')
    })

    it('Features Cover Button', () => {
      cy.get('.cover-button.btn-primary')
        .should('exist')
    })
  })

  it('Version can be opened and closed', () => {
    cy.get('#versionModal')
      .should('not.exist')
    cy.get('#version')
      .click()
    cy.get('#versionModal')
      .should('be.visible')
    cy.get('#versionModal .modal-footer .btn')
      .contains('Close')
      .click()
    cy.get('#versionModal')
      .should('not.exist')
  })
})
