import { DomElement } from 'domhandler'
import { ReactElement } from 'react'
import { SubNodeConverter } from '../../markdown-renderer'

const findQuoteOptionsParent = (nodes: DomElement[]): DomElement | undefined => {
  return nodes.find((child) => {
    if (child.name !== 'p' || !child.children || child.children.length < 1) {
      return false
    }
    return child.children.find(elem => elem.name === 'codimd-quote-options') !== undefined
  })
}

const getElementReplacement = (node: DomElement, index: number, counterMap: Map<string, number>, nodeConverter: SubNodeConverter): (ReactElement | undefined) => {
  if (node.name === 'blockquote' && node.children && node.children.length >= 1) {
    const paragraph = findQuoteOptionsParent(node.children)
    if (!paragraph) {
      return
    }
    const childElements = paragraph.children || []
    const optionsTag = childElements.find((child) => child.name === 'codimd-quote-options')
    if (!optionsTag) {
      return
    }
    paragraph.children = childElements.filter((child) => child.name !== 'codimd-quote-options')
    const attributes = optionsTag.attribs
    if (attributes && attributes.color) {
      node.attribs = Object.assign(node.attribs || {}, { style: `border-left-color: ${attributes.color};` })
      return nodeConverter(node, index)
    }
  }
}

export { getElementReplacement as getQuoteOptionsReplacement }
