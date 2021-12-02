/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

describe('Iframe capsule', () => {
  beforeEach(() => {
    cy.visitTestEditor()
  })

  it('shows a clickable click shield instead of the iframe', () => {
    cy.setCodemirrorContent('<iframe src="https://example.org"></iframe>')
    cy.getMarkdownBody().findById('iframe-capsule-click-shield').should('exist').click()
    cy.getMarkdownBody().find('iframe').should('exist').should('have.attr', 'src', 'https://example.org')
  })
})