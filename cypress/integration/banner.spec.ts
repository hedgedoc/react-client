/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

const BANNER_LOCAL_STORAGE_KEY = 'banner.etag'
const MOCK_E_TAG = 'mockETag'
const bannerMockContent = 'This is the mock banner call'

describe('Banner', () => {
  beforeEach(() => {
    cy.intercept({
      method: 'GET',
      url: '/mock-backend/public/banner.txt'
    }, {
      statusCode: 200,
      headers: { 'ETag': MOCK_E_TAG },
      body: bannerMockContent
    })

    cy.intercept({
      method: 'HEAD',
      url: '/mock-backend/public/banner.txt'
    }, {
      statusCode: 200,
      headers: { 'ETag': MOCK_E_TAG }
    })
      .as('headBanner')

    cy.visit('/')
    localStorage.removeItem(BANNER_LOCAL_STORAGE_KEY)
    expect(localStorage.getItem(BANNER_LOCAL_STORAGE_KEY)).to.be.null
  })

  it('shows the correct alert banner text', () => {
    cy.get('[data-cy="motd-banner"]')
      .contains(bannerMockContent)
  })

  it('can be dismissed', () => {
    cy.get('[data-cy="motd-banner"]')
      .contains(bannerMockContent)
    cy.get('button[data-cy="motd-dismiss"]')
      .click()
      .then(() => {
        expect(localStorage.getItem('banner.etag'))
          .to
          .equal(MOCK_E_TAG)
      })
    cy.get('[data-cy="no-motd-banner"]')
      .should('exist')
    cy.get('[data-cy="motd-banner"]')
      .should('not.exist')
  })

  it('won\'t show again on reload', () => {
    cy.get('[data-cy="motd-banner"]')
      .contains(bannerMockContent)
    cy.get('button[data-cy="motd-dismiss"]')
      .click()
      .then(() => {
        expect(localStorage.getItem(BANNER_LOCAL_STORAGE_KEY))
          .to
          .equal(MOCK_E_TAG)
      })
    cy.get('[data-cy="no-motd-banner"]')
      .should('exist')
    cy.get('[data-cy="motd-banner"]')
      .should('not.exist')
    cy.reload()
    cy.get('main')
      .should('exist')
    cy.wait('@headBanner')
    cy.get('[data-cy="no-motd-banner"]')
      .should('exist')
    cy.get('[data-cy="motd-banner"]')
      .should('not.exist')
  })
})
