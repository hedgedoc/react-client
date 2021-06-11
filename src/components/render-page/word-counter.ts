/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import wordsCount from 'words-count'

const EXCLUDED_TAGS = ['img', 'pre', 'nav']

export const countWordsRecursive = (node: Element | ChildNode): number => {
  let words = 0
  if (!node || EXCLUDED_TAGS.includes(node.nodeName.toLowerCase()) ||
    (node as HTMLElement).classList?.contains('katex-mathml')) {
    return 0
  }
  if (node.hasChildNodes()) {
    node.childNodes.forEach(childNode => {
      words += countWordsRecursive(childNode)
    })
  } else {
    return wordsCount(node.textContent ?? '')
  }
  return words
}
