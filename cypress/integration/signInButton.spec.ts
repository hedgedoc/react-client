/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

const authProvidersDisabled = {
  facebook: false,
  github: false,
  twitter: false,
  gitlab: false,
  dropbox: false,
  ldap: false,
  google: false,
  saml: false,
  oauth2: false,
  internal: false,
  openid: false
}

const interceptConfigWithAuthProviders = (cy: Cypress.cy, enabledProviders: Partial<typeof authProvidersDisabled>) => {
  cy.loadConfig({
    authProviders: {
      ...authProvidersDisabled,
      ...enabledProviders
    }
  })
}

describe('When logged-in, ', () => {
  it('sign-in button is hidden', () => {
    cy.loadConfig()
    cy.visit('/')
    cy.get('[data-cy=sign-in-button]')
      .should('not.exist')
  })
})

describe('When logged-out ', () => {
  beforeEach(() => {
    cy.loadConfig()
    cy.visit('/')
    cy.logout()
  })

  describe('and no auth-provider is enabled, ', () => {
    it('sign-in button is hidden', () => {
      interceptConfigWithAuthProviders(cy, {})
      cy.get('[data-cy=sign-in-button]')
        .should('not.exist')
    })
  })

  describe('and an interactive auth-provider is enabled, ', () => {
    it('sign-in button points to login route: internal', () => {
      interceptConfigWithAuthProviders(cy, {
        internal: true
      })
      cy.get('[data-cy=sign-in-button]')
        .should('be.visible')
        .should('have.attr', 'href', '/login')
    })

    it('sign-in button points to login route: ldap', () => {
      interceptConfigWithAuthProviders(cy, {
        ldap: true
      })
      cy.get('[data-cy=sign-in-button]')
        .should('be.visible')
        .should('have.attr', 'href', '/login')
    })

    it('sign-in button points to login route: openid', () => {
      interceptConfigWithAuthProviders(cy, {
        openid: true
      })
      cy.get('[data-cy=sign-in-button]')
        .should('be.visible')
        .should('have.attr', 'href', '/login')
    })
  })

  describe('and only one one-click auth-provider is enabled, ', () => {
    it('sign-in button points to auth-provider', () => {
      interceptConfigWithAuthProviders(cy, {
        saml: true
      })
      cy.get('[data-cy=sign-in-button]')
        .should('be.visible')
        .should('have.attr', 'href', '/api/v2/auth/saml')
    })
  })

  describe('and multiple one-click auth-providers are enabled, ', () => {
    it('sign-in button points to login route', () => {
      interceptConfigWithAuthProviders(cy, {
        saml: true,
        github: true
      })
      cy.get('[data-cy=sign-in-button]')
        .should('be.visible')
        .should('have.attr', 'href', '/login')
    })
  })

  describe('and one-click- as well as interactive auth-providers are enabled, ', () => {
    it('sign-in button points to login route', () => {
      interceptConfigWithAuthProviders(cy, {
        saml: true,
        internal: true
      })
      cy.get('[data-cy=sign-in-button]')
        .should('be.visible')
        .should('have.attr', 'href', '/login')
    })
  })
})
