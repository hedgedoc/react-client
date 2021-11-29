/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type MarkdownIt from 'markdown-it/lib'

export const imagePlaceholderMarkdownPlugin: MarkdownIt.PluginSimple = (md: MarkdownIt) => {
  md.core.ruler.push('image-placeholder', (state) => {
    state.tokens.forEach((token) => {
      if (token.type !== 'inline') {
        return
      }
      token.children?.forEach((childToken) => {
        if (childToken.type === 'image' && childToken.attrGet('src') === 'https://') {
          const line = token.map?.[0]
          if (line !== undefined) {
            childToken.attrSet('data-line', String(line))
          }
        }
      })
    })
    return true
  })
}
