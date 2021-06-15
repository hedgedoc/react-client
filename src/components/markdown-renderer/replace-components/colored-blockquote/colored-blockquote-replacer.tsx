/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Element, isTag } from 'domhandler'
import { ComponentReplacer, NativeRenderer, SubNodeTransform, ValidReactDomElement } from '../ComponentReplacer'

const isColorExtraElement = (node: Element | undefined): boolean => {
  if (!node || !node.attribs || !node.attribs.class || !node.attribs['data-color']) {
    return false
  }
  return node.name === 'span' && node.attribs.class === 'quote-extra'
}

const findQuoteOptionsParent = (nodes: Element[]): Element | undefined => {
  return nodes.find((child) => {
    if (child.name !== 'p' || !child.children || child.children.length < 1) {
      return false
    }
    return child.children.filter(isTag).find(isColorExtraElement) !== undefined
  })
}

export class ColoredBlockquoteReplacer extends ComponentReplacer {
  public getReplacement(
    node: Element,
    subNodeTransform: SubNodeTransform,
    nativeRenderer: NativeRenderer
  ): ValidReactDomElement | undefined {
    if (node.name !== 'blockquote' || !node.children || node.children.length < 1) {
      return
    }
    const paragraph = findQuoteOptionsParent(node.children.filter(isTag))
    if (!paragraph) {
      return
    }
    const childElements = paragraph.children || []
    const optionsTag = childElements.filter(isTag).find(isColorExtraElement)
    if (!optionsTag) {
      return
    }
    paragraph.children = childElements.filter((elem) => !isTag(elem) || !isColorExtraElement(elem))
    const attributes = optionsTag.attribs
    if (!attributes || !attributes['data-color']) {
      return
    }
    node.attribs = Object.assign(node.attribs || {}, { style: `border-left-color: ${attributes['data-color']};` })
    return nativeRenderer()
  }
}
