/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

const MOTD_LOCAL_STORAGE_KEY = 'motd.lastModified'
const MOCK_LAST_MODIFIED = 'mockETag'
const motdMockContent = 'This is the mock Motd call'

describe('Motd', () => {
  const mockExistingMotd = () => {
    cy.intercept('GET', '/mock-backend/public/motd.txt', {
      statusCode: 200,
      headers: { 'Last-Modified': MOCK_LAST_MODIFIED },
      body: motdMockContent
    })

    cy.intercept('HEAD', '/mock-backend/public/motd.txt', {
      statusCode: 200,
      headers: { 'Last-Modified': MOCK_LAST_MODIFIED }
    })
  }

  beforeEach(() => {
    localStorage.removeItem(MOTD_LOCAL_STORAGE_KEY)
  })

  it('shows the correct alert Motd text', () => {
    mockExistingMotd()
    cy.visit('/')
    cy.get('[data-cy="motd"]').contains(motdMockContent)
  })

  it('can be dismissed', () => {
    mockExistingMotd()
    cy.visit('/')
    cy.get('[data-cy="motd"]').contains(motdMockContent)
    cy.get('button[data-cy="motd-dismiss"]')
      .click()
      .then(() => {
        expect(localStorage.getItem(MOTD_LOCAL_STORAGE_KEY)).to.equal(MOCK_LAST_MODIFIED)
      })
    cy.get('[data-cy="motd-dismissed"]').should('exist')
    cy.get('[data-cy="motd"]').should('not.exist')
  })

  it("won't show again after dismiss and reload", () => {
    mockExistingMotd()
    cy.visit('/')
    cy.get('[data-cy="motd"]').contains(motdMockContent)
    cy.get('button[data-cy="motd-dismiss"]')
      .click()
      .then(() => {
        expect(localStorage.getItem(MOTD_LOCAL_STORAGE_KEY)).to.equal(MOCK_LAST_MODIFIED)
      })
    cy.get('[data-cy="motd-dismissed"]').should('exist')
    cy.get('[data-cy="motd"]').should('not.exist')
    cy.reload()
    cy.get('main').should('exist')
    cy.get('[data-cy="no-motd"]').should('exist')
    cy.get('[data-cy="motd"]').should('not.exist')
  })

  it("will show again after reload without dismiss", () => {
    mockExistingMotd()
    cy.visit('/')
    cy.get('[data-cy="motd"]').contains(motdMockContent)
    cy.reload()
    cy.get('main').should('exist')
    cy.get('[data-cy="motd"]').contains(motdMockContent)
  })

  it("won't show again after dismiss and page navigation", () => {
    mockExistingMotd()
    cy.visit('/')
    cy.get('[data-cy="motd"]').contains(motdMockContent)
    cy.get('button[data-cy="motd-dismiss"]')
      .click()
      .then(() => {
        expect(localStorage.getItem(MOTD_LOCAL_STORAGE_KEY)).to.equal(MOCK_LAST_MODIFIED)
      })
    cy.get('[data-cy="motd-dismissed"]').should('exist')
    cy.get('[data-cy="motd"]').should('not.exist')
    cy.get('#navLinkHistory').click()
    cy.get('main').should('exist')
    cy.get('[data-cy="motd-dismissed"]').should('exist')
    cy.get('[data-cy="motd"]').should('not.exist')
  })

  it("won't show if no file exists", () => {
    cy.visit('/')
    cy.get('main').should('exist')
    cy.get('[data-cy="no-motd"]').should('exist')
  })
})
