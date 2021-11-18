/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

describe('Editor mode from URL parameter is used', () => {
  it('mode view', () => {
    cy.visitTestEditor('view')
    cy.get('.splitter.left').should('not.be.visible')
    cy.get('.splitter.right').should('be.visible')
  })
  it('mode both', () => {
    cy.visitTestEditor('both')
    cy.get('.splitter.left').should('be.visible')
    cy.get('.splitter.separator').should('exist')
    cy.get('.splitter.right').should('be.visible')
  })
  it('mode edit', () => {
    cy.visitTestEditor('edit')
    cy.get('.splitter.left').should('be.visible')
    cy.get('.splitter.right').should('not.be.visible')
  })
})
