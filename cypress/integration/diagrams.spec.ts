/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

describe('renders diagram', () => {
  beforeEach(() => {
    cy.visitTestEditor()
  })

  it('markmap', () => {
    cy.codemirrorFill('```markmap\n- pro\n- contra\n```')
    cy.getMarkdownBody()
      .find('svg')
      .should('be.visible')
  })

  it('vega-lite', () => {
    cy.codemirrorFill('```vega-lite\n{"$schema":"https://vega.github.io/schema/vega-lite/v4.json","data":{"values":[{"a":"","b":28}]},"mark":"bar","encoding":{"x":{"field":"a"},"y":{"field":"b"}}}\n```')
    cy.getMarkdownBody()
      .find('div.vega-embed canvas')
      .should('be.visible')
  })

  it('graphviz', () => {
    cy.codemirrorFill('```graphviz\ngraph {\na -- b\n}\n```')
    cy.getMarkdownBody()
      .find('svg')
      .should('be.visible')
  })

  it('mermaid', () => {
    cy.codemirrorFill('```mermaid\ngraph TD;\n    A-->B;\n```')
    cy.getMarkdownBody()
      .find('div.mermaid > svg')
      .should('be.visible')
  })

  it('flowchart', () => {
    cy.codemirrorFill('```flow\nst=>start: Start\ne=>end: End\nst->e\n```')
    cy.getMarkdownBody()
      .find('svg')
      .should('be.visible')
  })

  it('abc', () => {
    cy.codemirrorFill('```abc\nM:4/4\nK:G\n|:GABc dedB:|\n```')
    cy.getMarkdownBody()
      .find('div.abcjs-score > svg')
      .should('be.visible')
  })

  it('csv', () => {
    cy.codemirrorFill('```csv delimiter=; header\na;b;c;d\n1;2;3;4\n```')
    cy.getMarkdownBody()
      .find('table.csv-html-table')
      .should('be.visible')
  })

  it('plantuml', () => {
    cy.codemirrorFill('```plantuml\nclass Example\n```')
    cy.getMarkdownBody()
      .find('img')
      .should('have.attr', 'title', 'uml diagram')
  })
})
