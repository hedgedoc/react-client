/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

describe('The status bar text length info', () => {
  const warningTestContent = '0123456789'.repeat(10)
  const dangerTestContent = '0123456789'.repeat(20)
  const tooMuchTestContent = `${dangerTestContent}a`

  beforeEach(() => {
    cy.visitTestEditor()
  })

  it('shows the maximal length of the document as number of available characters in the tooltip', () => {
    cy.getById('remainingCharacters').attribute('title').should('contain', ' 200 ')
  })

  it('color is set to "warning" on <= 100 characters remaining', () => {
    cy.setCodemirrorContent(warningTestContent)
    cy.getById('remainingCharacters').should('have.class', 'text-warning')
  })

  it('color is set to danger on <= 0 characters remaining', () => {
    cy.setCodemirrorContent(dangerTestContent)
    cy.getById('remainingCharacters').should('have.class', 'text-danger')
  })

  it('opens a modal', () => {
    cy.setCodemirrorContent(tooMuchTestContent)
    cy.getById('limitReachedModal').should('be.visible')
  })
})
