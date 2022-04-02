/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type MarkdownIt from 'markdown-it'
import type { RuleCore } from 'markdown-it/lib/parser_core'

const ruleName = 'code-highlighter'
const codeFenceArguments = /^ *([\w-]*)(.*)$/

/**
 * Extracts the language name and additional flags from the code fence parameter and sets them as attributes in the token.
 *
 * @param state The current state of the processing {@link MarkdownIt} instance.
 * @see MarkdownIt.RuleCore
 */
const rule: RuleCore = (state) => {
  state.tokens.forEach((token) => {
    if (token.type === 'fence') {
      const highlightInfos = codeFenceArguments.exec(token.info)
      if (!highlightInfos) {
        return
      }
      if (highlightInfos[1]) {
        token.attrJoin('data-highlight-language', highlightInfos[1])
      }
      if (highlightInfos[2]) {
        token.attrJoin('data-extra', highlightInfos[2])
      }
    }
  })
  return true
}

/**
 * Adds the rule to the given {@link MarkdownIt markdown-it instance} if it hasn't been added yet.
 *
 * @param markdownIt The {@link MarkdownIt markdown-it instance} to which the rule should be added
 */
export const codeBlockMarkdownPlugin: MarkdownIt.PluginSimple = (markdownIt) => {
  if (markdownIt.core.ruler.getRules(ruleName).length === 0) {
    markdownIt.core.ruler.push(ruleName, rule, { alt: [ruleName] })
  }
}
