import { DomElement } from 'domhandler'
import { ReactElement } from 'react'
import { SubNodeConverter } from '../../markdown-renderer'

const isColorExtraElement = (node: DomElement | undefined): boolean => {
  if (!node || !node.attribs || !node.attribs.class || !node.attribs['data-color']) {
    return false
  }
  return (node.name === 'span' && node.attribs.class === 'quote-extra')
}

const findQuoteOptionsParent = (nodes: DomElement[]): DomElement | undefined => {
  return nodes.find((child) => {
    if (child.name !== 'p' || !child.children || child.children.length < 1) {
      return false
    }
    return child.children.find(isColorExtraElement) !== undefined
  })
}

const getElementReplacement = (node: DomElement, index: number, counterMap: Map<string, number>, nodeConverter: SubNodeConverter): (ReactElement | undefined) => {
  if (node.name !== 'blockquote' || !node.children || node.children.length < 1) {
    return
  }
  const paragraph = findQuoteOptionsParent(node.children)
  if (!paragraph) {
    return
  }
  const childElements = paragraph.children || []
  const optionsTag = childElements.find(isColorExtraElement)
  if (!optionsTag) {
    return
  }
  paragraph.children = childElements.filter(elem => !isColorExtraElement(elem))
  const attributes = optionsTag.attribs
  if (!attributes || !attributes['data-color']) {
    return
  }
  node.attribs = Object.assign(node.attribs || {}, { style: `border-left-color: ${attributes['data-color']};` })
  return nodeConverter(node, index)
}

export { getElementReplacement as getQuoteOptionsReplacement }
