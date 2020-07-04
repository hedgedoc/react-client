import '../support/index'

describe('Links Intro', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('Cover Buttons', () => {
    beforeEach(() => {
      cy.logout()
    })

    it('Sign in Cover Button', () => {
      cy.get('.cover-button.btn-success')
        .click()
      cy.url()
        .should('include', '/login')
    })

    it('Features Cover Button', () => {
      cy.get('.cover-button.btn-primary')
        .click()
      cy.url()
        .should('include', '/features')
    })
  })

  it('History', () => {
    cy.get('#navLinkHistory')
      .click()
    cy.url()
      .should('include', '/history')
    cy.get('#navLinkIntro')
      .click()
    cy.url()
      .should('include', '/intro')
  })

  describe('Menu Buttons logged out', () => {
    beforeEach(() => {
      cy.logout()
    })

    it('New guest note', () => {
      cy.get('.d-inline-flex.btn-primary')
        .click()
      cy.url()
        .should('include', '/new')
    })

    it('Sign In', () => {
      cy.get('.btn-success.btn-sm')
        .click()
      cy.url()
        .should('include', '/login')
    })
  })

  describe('Menu Buttons logged in', () => {
    it('New note', () => {
      cy.get('.d-inline-flex.btn-primary').click()
      cy.url()
        .should('include', '/new')
    })

    describe('User Menu', () => {
      beforeEach(() => {
        cy.get('#dropdown-user').click()
      })

      it('Features', () => {
        cy.get('a.dropdown-item > i.fa-bolt')
          .click()
        cy.url()
          .should('include', '/features')
      })

      it('Features', () => {
        cy.get('a.dropdown-item > i.fa-user')
          .click()
        cy.url()
          .should('include', '/profile')
      })
    })
  })

  describe('Feature Links', () => {
    it('Share-Notes', () => {
      cy.get('i.fa-bolt.fa-3x')
        .click()
      cy.url()
        .should('include', '/features#Share-Notes')
    })

    it('MathJax', () => {
      cy.get('i.fa-bar-chart.fa-3x')
        .click()
      cy.url()
        .should('include', '/features#MathJax')
    })

    it('Slide-Mode', () => {
      cy.get('i.fa-television.fa-3x')
        .click()
      cy.url()
        .should('include', '/features#Slide-Mode')
    })
  })

  describe('Powered By Links', () => {
    it('CodiMD', () => {
      cy.get('a#codimd')
        .checkExternalLink('https://codimd.org')
    })

    it('Releases', () => {
      cy.get('a#releases')
        .click()
      cy.url()
        .should('include', '/n/release-notes')
    })

    it('Privacy', () => {
      cy.get('a#privacy')
        .checkExternalLink('https://example.com/privacy')
    })

    it('TermsOfUse', () => {
      cy.get('a#termsOfUse')
        .checkExternalLink('https://example.com/termsOfUse')
    })

    it('Imprint', () => {
      cy.get('a#imprint')
        .checkExternalLink('https://example.com/imprint')
    })
  })

  describe('Follow us Links', () => {
    it('Github', () => {
      cy.get('a#github')
        .checkExternalLink('https://github.com/codimd/server')
    })

    it('Discourse', () => {
      cy.get('a#discourse')
        .checkExternalLink('https://community.codimd.org')
    })

    it('Matrix', () => {
      cy.get('a#matrix')
        .checkExternalLink('https://riot.im/app/#/room/#codimd:matrix.org')
    })

    it('Mastodon', () => {
      cy.get('a#mastodon')
        .checkExternalLink('https://social.codimd.org/mastodon')
    })

    it('POEditor', () => {
      cy.get('a#poeditor')
        .checkExternalLink('https://translate.codimd.org')
    })
  })
})
