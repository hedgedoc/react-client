/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

const imageUrl = 'http://example.com/non-existing.png'

describe('File upload', () => {
  beforeEach(() => {
    cy.visitTestNote()
  })

  it("doesn't prevent drag'n'drop of plain text", () => {
    const dataTransfer = new DataTransfer()
    cy.setCodemirrorContent('line 1\nline 2\ndragline')
    cy.get('.CodeMirror').click()
    cy.get('.CodeMirror-line > span').last().dblclick()
    cy.get('.CodeMirror-line > span > .cm-matchhighlight').trigger('dragstart', { dataTransfer })
    cy.get('.CodeMirror-code > div:nth-of-type(1) > .CodeMirror-line > span > span').trigger('drop', { dataTransfer })
    cy.get('.CodeMirror-code > div:nth-of-type(1) > .CodeMirror-line > span > span').should(
      'have.text',
      'lindraglinee 1'
    )
  })

  describe('works', () => {
    beforeEach(() => {
      cy.intercept(
        {
          method: 'GET',
          url: '/mock-backend/api/private/media/upload-post'
        },
        {
          statusCode: 200,
          body: {
            link: imageUrl
          }
        }
      )
    })
    it('via button', () => {
      cy.getByCypressId('editor-toolbar-upload-image-button').should('be.visible')
      cy.getByCypressId('editor-toolbar-upload-image-input').attachFixture({
        filePath: 'demo.png',
        mimeType: 'image/png'
      })
      cy.get('.CodeMirror-activeline').contains(`![](${imageUrl})`)
    })

    it('via paste', () => {
      cy.fixture('demo.png').then((image: string) => {
        const pasteEvent = {
          clipboardData: {
            files: [Cypress.Blob.base64StringToBlob(image, 'image/png')],
            getData: (_: string) => ''
          }
        }
        cy.get('.CodeMirror-scroll').trigger('paste', pasteEvent)
        cy.get('.CodeMirror-activeline').contains(`![](${imageUrl})`)
      })
    })

    it('via drag and drop', () => {
      cy.fixture('demo.png').then((image: string) => {
        const dropEvent = {
          dataTransfer: {
            files: [Cypress.Blob.base64StringToBlob(image, 'image/png')],
            effectAllowed: 'uninitialized'
          }
        }
        cy.get('.CodeMirror-scroll').trigger('dragenter', dropEvent)
        cy.get('.CodeMirror-scroll').trigger('drop', dropEvent)
        cy.get('.CodeMirror-activeline').contains(`![](${imageUrl})`)
      })
    })
  })

  it('fails', () => {
    cy.intercept(
      {
        method: 'GET',
        url: '/mock-backend/api/private/media/upload-post'
      },
      {
        statusCode: 400
      }
    )
    cy.getByCypressId('editor-toolbar-upload-image-button').should('be.visible')
    cy.getByCypressId('editor-toolbar-upload-image-input').attachFixture({
      filePath: 'demo.png',
      mimeType: 'image/png'
    })
    cy.get('.CodeMirror-activeline').contains('![upload of demo.png failed]()')
  })

  it('lets text paste still work', () => {
    const testText = 'a long test text'
    const pasteEvent = {
      clipboardData: {
        getData: (type = 'text') => testText
      }
    }
    cy.get('.CodeMirror-scroll').trigger('paste', pasteEvent)
    cy.get('.CodeMirror-activeline').contains(`${testText}`)
  })
})
