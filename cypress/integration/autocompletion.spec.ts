describe('Autocompletion', () => {
  beforeEach(() => {
    cy.visit('/n/test')
    cy.get('.btn.active.btn-outline-secondary > i.fa-columns')
    .should('exist')
    cy.get('.CodeMirror textarea')
      .type('{ctrl}a', { force: true })
      .type('{backspace}')
  })

  describe('code block', () => {
    it('via Enter', () => {
      cy.get('.CodeMirror textarea')
        .type('```a')
      cy.get('.CodeMirror-hints')
        .should('exist')
      cy.get('.CodeMirror textarea')
        .type('{enter}')
      cy.get('.CodeMirror-hints')
        .should('not.exist')
      cy.get('.CodeMirror-code > div:nth-of-type(1) > .CodeMirror-line > span > span')
        .should('have.text', '```abnf')
      cy.get('.CodeMirror-code > div.CodeMirror-activeline > .CodeMirror-line > span  span')
        .should('have.text', '```')
      cy.get('.markdown-body > pre > code')
        .should('exist')
    })
    it('via doubleclick', () => {
      cy.get('.CodeMirror textarea')
        .type('```a')
      cy.get('.CodeMirror-hints > li')
        .first()
        .dblclick()
      cy.get('.CodeMirror-hints')
        .should('not.exist')
      cy.get('.CodeMirror-code > div:nth-of-type(1) > .CodeMirror-line > span > span')
        .should('have.text', '```abnf')
      cy.get('.CodeMirror-code > div.CodeMirror-activeline > .CodeMirror-line > span  span')
        .should('have.text', '```')
      cy.get('.markdown-body > pre > code')
        .should('exist')
    })
  })

  describe('container', () => {
    it('via Enter', () => {
      cy.get('.CodeMirror textarea')
        .type(':::a')
      cy.get('.CodeMirror-hints')
        .should('exist')
      cy.get('.CodeMirror textarea')
        .type('{enter}')
      cy.get('.CodeMirror-hints')
        .should('not.exist')
      cy.get('.CodeMirror-code > div:nth-of-type(1) > .CodeMirror-line > span > span')
        .should('have.text', ':::success')
      cy.get('.CodeMirror-code > div.CodeMirror-activeline > .CodeMirror-line > span  span')
        .should('have.text', ':::')
      cy.get('.markdown-body > div.alert')
        .should('exist')
    })
    it('via doubleclick', () => {
      cy.get('.CodeMirror textarea')
        .type(':::a')
      cy.get('.CodeMirror-hints > li')
        .first()
        .dblclick()
      cy.get('.CodeMirror-hints')
        .should('not.exist')
      cy.get('.CodeMirror-code > div:nth-of-type(1) > .CodeMirror-line > span > span')
        .should('have.text', ':::success')
      cy.get('.CodeMirror-code > div.CodeMirror-activeline > .CodeMirror-line > span  span')
        .should('have.text', ':::')
      cy.get('.markdown-body > div.alert')
        .should('exist')
    })
  })

  describe('emoji', () => {
    describe('normal emoji', () => {
      it('via Enter', () => {
        cy.get('.CodeMirror textarea')
          .type(':book')
        cy.get('.CodeMirror-hints')
          .should('exist')
        cy.get('.CodeMirror textarea')
          .type('{enter}')
        cy.get('.CodeMirror-hints')
          .should('not.exist')
        cy.get('.CodeMirror-activeline > .CodeMirror-line > span')
          .should('have.text', ':book:')
        cy.get('.markdown-body')
          .should('have.text', '📖')
      })
      it('via doubleclick', () => {
        cy.get('.CodeMirror textarea')
          .type(':book')
        cy.get('.CodeMirror-hints > li')
          .first()
          .dblclick()
        cy.get('.CodeMirror-hints')
          .should('not.exist')
        cy.get('.CodeMirror-activeline > .CodeMirror-line > span')
          .should('have.text', ':book:')
        cy.get('.markdown-body')
          .should('have.text', '📖')
      })
    })

    describe('fork-awesome-icon', () => {
      it('via Enter', () => {
        cy.get('.CodeMirror textarea')
          .type(':facebook')
        cy.get('.CodeMirror-hints')
          .should('exist')
        cy.get('.CodeMirror textarea')
          .type('{enter}')
        cy.get('.CodeMirror-hints')
          .should('not.exist')
        cy.get('.CodeMirror-activeline > .CodeMirror-line > span')
          .should('have.text', ':fa-facebook:')
        cy.get('.markdown-body > p > i.fa.fa-facebook')
          .should('exist')
      })
      it('via doubleclick', () => {
        cy.get('.CodeMirror textarea')
          .type(':facebook')
        cy.get('.CodeMirror-hints > li')
          .first()
          .dblclick()
        cy.get('.CodeMirror-hints')
          .should('not.exist')
        cy.get('.CodeMirror-activeline > .CodeMirror-line > span')
          .should('have.text', ':fa-facebook:')
        cy.get('.markdown-body > p > i.fa.fa-facebook')
          .should('exist')
      })
    })
  })

  describe('header', () => {
    it('via Enter', () => {
      cy.get('.CodeMirror textarea')
        .type('#')
      cy.get('.CodeMirror-hints')
        .should('exist')
      cy.get('.CodeMirror textarea')
        .type('{enter}')
      cy.get('.CodeMirror-hints')
        .should('not.exist')
      cy.get('.CodeMirror-activeline > .CodeMirror-line > span')
        .should('have.text', '# h1')
      cy.get('.markdown-body > h1 ')
        .should('have.text', ' h1')
    })
    it('via doubleclick', () => {
      cy.get('.CodeMirror textarea')
        .type('#')
      cy.get('.CodeMirror-hints > li')
        .first()
        .dblclick()
      cy.get('.CodeMirror-hints')
        .should('not.exist')
      cy.get('.CodeMirror-activeline > .CodeMirror-line > span')
        .should('have.text', '# h1')
      cy.get('.markdown-body > h1')
        .should('have.text', ' h1')
    })
  })

  describe('images', () => {
    it('via Enter', () => {
      cy.get('.CodeMirror textarea')
        .type('!')
      cy.get('.CodeMirror-hints')
        .should('exist')
      cy.get('.CodeMirror textarea')
        .type('{enter}')
      cy.get('.CodeMirror-hints')
        .should('not.exist')
      cy.get('.CodeMirror-activeline > .CodeMirror-line > span')
        .should('have.text', '![image alt](https:// "title")')
      cy.get('.markdown-body > p > img')
        .should('have.attr', 'alt', 'image alt')
        .should('have.attr', 'src', 'https://')
    })
    it('via doubleclick', () => {
      cy.get('.CodeMirror textarea')
        .type('!')
      cy.get('.CodeMirror-hints > li')
        .first()
        .dblclick()
      cy.get('.CodeMirror-hints')
        .should('not.exist')
      cy.get('.CodeMirror-activeline > .CodeMirror-line > span')
        .should('have.text', '![image alt](https:// "title")')
      cy.get('.markdown-body > p > img')
        .should('have.attr', 'alt', 'image alt')
        .should('have.attr', 'src', 'https://')
    })
  })

  describe('links', () => {
    it('via Enter', () => {
      cy.get('.CodeMirror textarea')
        .type('[')
      cy.get('.CodeMirror-hints')
        .should('exist')
      cy.get('.CodeMirror textarea')
        .type('{enter}')
      cy.get('.CodeMirror-hints')
        .should('not.exist')
      cy.get('.CodeMirror-activeline > .CodeMirror-line > span')
        .should('have.text', '[link text](https:// "title")')
      cy.get('.markdown-body > p > a')
        .should('have.text', 'link text')
        .should('have.attr', 'href', 'https://')
        .should('have.attr', 'title', 'title')
    })
    it('via doubleclick', () => {
      cy.get('.CodeMirror textarea')
        .type('[')
      cy.get('.CodeMirror-hints > li')
        .first()
        .dblclick()
      cy.get('.CodeMirror-hints')
        .should('not.exist')
      cy.get('.CodeMirror-activeline > .CodeMirror-line > span')
        .should('have.text', '[link text](https:// "title")')
      cy.get('.markdown-body > p > a')
        .should('have.text', 'link text')
        .should('have.attr', 'href', 'https://')
        .should('have.attr', 'title', 'title')
    })
  })

  describe('pdf', () => {
    it('via Enter', () => {
      cy.get('.CodeMirror textarea')
        .type('{')
      cy.get('.CodeMirror-hints')
        .should('exist')
      cy.get('.CodeMirror textarea')
        .type('{enter}')
      cy.get('.CodeMirror-hints')
        .should('not.exist')
      cy.get('.CodeMirror-activeline > .CodeMirror-line > span')
        .should('have.text', '{%pdf %}')
      cy.get('.markdown-body > p')
        .should('exist')
    })
    it('via doubleclick', () => {
      cy.get('.CodeMirror textarea')
        .type('{')
      cy.get('.CodeMirror-hints > li')
        .first()
        .dblclick()
      cy.get('.CodeMirror-hints')
        .should('not.exist')
      cy.get('.CodeMirror-activeline > .CodeMirror-line > span')
        .should('have.text', '{%pdf %}')
      cy.get('.markdown-body > p')
        .should('exist')
    })
  })
})
