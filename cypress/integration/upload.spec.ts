/*
 * SPDX-FileCopyrightText: 2020 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

const url = 'http://localhost:3001/test-image.png'

describe('Upload', () => {
  beforeEach(() => {
    cy.visit('/n/test')
    cy.get('.btn.active.btn-outline-secondary > i.fa-columns')
      .should('exist')
    cy.get('.CodeMirror textarea')
      .type('{ctrl}a', { force: true })
      .type('{backspace}')
    cy.viewport(1920, 1080)
  })

  describe('upload works', () => {
    beforeEach(() => {
      cy.intercept({
        method: 'POST',
        url: '/api/v2/media/upload'
      }, {
        statusCode: 201,
        body: {
          link: url
        }
      })
      cy.fixture('acme.png').then(image => {
        this.image = image
      })
    })
    it('via button', () => {
      cy.get('input[type=file]')
        .attachFile({ filePath: 'acme.png', mimeType: 'image/png' })
      cy.get('.CodeMirror-activeline > .CodeMirror-line > span')
        .should('have.text', `![](${url})`)
    })

    it('via paste', () => {
      const pasteEvent = {
        clipboardData: {
          files: [Cypress.Blob.base64StringToBlob(this.image, 'image/png')]
        }
      }
      cy.get('.CodeMirror-scroll').trigger('paste', pasteEvent)
      cy.get('.CodeMirror-activeline > .CodeMirror-line > span')
        .should('have.text', `![](${url})`)
    })

    it('via drag and drop', () => {
      const dropEvent = {
        dataTransfer: {
          files: [Cypress.Blob.base64StringToBlob(this.image, 'image/png')]
        }
      }
      cy.get('.CodeMirror-scroll').trigger('dragenter')
      cy.get('.drop-overlay').trigger('drop', dropEvent)
      cy.get('.CodeMirror-activeline > .CodeMirror-line > span')
        .should('have.text', `![](${url})`)
    })
  })

  describe('upload fails', () => {
    it('via button', () => {
      cy.get('.CodeMirror textarea')
        .type('not empty')
      cy.intercept({
        method: 'POST',
        url: '/api/v2/media/upload'
      }, {
        statusCode: 400
      })
      cy.get('input[type=file]')
        .attachFile({ filePath: 'acme.png', mimeType: 'image/png' })
      cy.get('.CodeMirror-activeline > .CodeMirror-line > span')
        .should('have.text', 'not empty')
    })
  })
})
