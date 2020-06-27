const logout = () => {
  cy.get('#dropdown-user').click()
  cy.get('.fa-sign-out').click()
}

const checkExternalLink = (selector, url) => {
  cy.get(selector)
    .should('have.attr', 'href', url)
    .should('have.attr', 'target', '_blank')
}

describe('Links Intro', () => {
  beforeEach(function () {
    cy.visit('http://localhost:3000/')
  })

  describe('Cover Buttons', () => {
    beforeEach(() => {
      logout()
    })

    it('Sign in Cover Button', () => {
      cy.get('.cover-button.btn-success').click()
      cy.url()
        .should('include', '/login')
    })

    it('Features Cover Button', () => {
      cy.get('.cover-button.btn-primary').click()
      cy.url()
        .should('include', '/features')
    })
  })

  describe('Menu Buttons logged out', () => {
    beforeEach(() => {
      logout()
    })

    it('New guest note', () => {
      cy.get('.d-inline-flex.btn-primary').click()
      cy.url()
        .should('include', '/new')
    })

    it('Sign In', () => {
      cy.get('.btn-success.btn-sm').click()
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
        cy.get('a.dropdown-item > i.fa-bolt').click()
        cy.url()
          .should('include', '/features')
      })

      it('Features', () => {
        cy.get('a.dropdown-item > i.fa-user').click()
        cy.url()
          .should('include', '/profile')
      })
    })
  })

  describe('Feature Links', () => {
    it('Share-Notes', () => {
      cy.get('i.fa-bolt.fa-3x').click()
      cy.url()
        .should('include', '/features#Share-Notes')
    })

    it('MathJax', () => {
      cy.get('i.fa-bar-chart.fa-3x').click()
      cy.url()
        .should('include', '/features#MathJax')
    })

    it('Slide-Mode', () => {
      cy.get('i.fa-television.fa-3x').click()
      cy.url()
        .should('include', '/features#Slide-Mode')
    })
  })

  describe('Follow us Links', () => {
    it('Github', () => {
      checkExternalLink('a#github', 'https://github.com/codimd/server')
    })

    it('Discourse', () => {
      checkExternalLink('a#discourse', 'https://community.codimd.org')
    })

    it('Matrix', () => {
      checkExternalLink('a#matrix', 'https://riot.im/app/#/room/#codimd:matrix.org')
    })

    it('Mastodon', () => {
      checkExternalLink('a#mastodon', 'https://social.codimd.org/mastodon')
    })

    it('POEditor', () => {
      checkExternalLink('a#poeditor', 'https://translate.codimd.org')
    })
  })
})
