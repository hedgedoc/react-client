/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import MarkdownIt from 'markdown-it/lib'
import StateInline from 'markdown-it/lib/rules_inline/state_inline'
import Token from 'markdown-it/lib/token'
import { IconName } from '../../common/fork-awesome/types'

export interface QuoteExtraOptions {
  quoteLabel: string
  icon: IconName
}

export type PartParser = (line: string, start: number, maxPos: number) => (number | undefined)

export const quoteExtra: (pluginOptions: QuoteExtraOptions) => MarkdownIt.PluginSimple =
  (pluginOptions) => (md) => {
    md.inline.ruler.push(`extraQuote_${ pluginOptions.quoteLabel }`, (state) => {
      if (state.src[state.pos] !== '[') {
        return false
      }

      const quoteLabel = parsePart(state, state.pos + 1, parseLabel)
      if (!quoteLabel || quoteLabel !== pluginOptions.quoteLabel) {
        return false
      }

      const quoteValue = parsePart(state, state.pos + quoteLabel.length + 2, parseValue)
      if (!quoteValue) {
        return false
      }

      state.pos += quoteLabel.length + quoteValue.length + 3

      const tokens: Token[] = []
      state.md.inline.parse(
        quoteValue,
        state.md,
        state.env,
        tokens
      )

      const token = state.push('quote-extra', '', 0)
      token.attrSet('icon', pluginOptions.icon)
      token.children = tokens

      return true
    })

    if (md.renderer.rules['quote-extra']) {
      return
    }

    md.renderer.rules['quote-extra'] = (tokens, idx, options: MarkdownIt.Options, env: unknown) => {
      const token = tokens[idx]
      const innerTokens = token.children

      if (!innerTokens) {
        return ''
      }

      const innerHtml = md.renderer.renderInline(innerTokens, options, env)
      return `<span class="quote-extra"><i class="fa fa-${ token.attrGet('icon') ?? '' } mx-1"></i>${ innerHtml }</span>`
    }
  }

export const parsePart = (state: StateInline, startIndex: number, parser: PartParser): string | undefined => {
  const endIndex = parser(state.src, startIndex, state.posMax)

  if (endIndex === undefined || startIndex === endIndex) {
    return undefined
  }

  return state.src.substr(startIndex, endIndex - startIndex)
}

export const parseValue = (line: string, start: number, maxPos: number): number | undefined => {
  let level = 1
  for (let pos = start; pos <= maxPos; pos += 1) {
    const currentCharacter = line[pos]
    if (currentCharacter === ']') {
      level -= 1
      if (level === 0) {
        return pos
      }
    } else if (currentCharacter === '[') {
      level += 1
    }
  }
}

export const parseLabel = (line: string, start: number, maxPos: number): number | undefined => {
  for (let pos = start; pos <= maxPos; pos += 1) {
    if (line[pos] === '=') {
      return pos
    }
  }
}
