/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { combinedEmojiData } from '../../../markdown-renderer/markdown-extension/emoji/mapping'
import type { CompletionContext, CompletionResult } from '@codemirror/autocomplete'

export const emojiAutocompletion = (context: CompletionContext): CompletionResult | null => {
  const match = context.matchBefore(/\s:/)
  if (!match || (!context.explicit && match.from === match.to)) {
    return null
  }
  const completions = Object.entries(combinedEmojiData).map(([shortcode, emoji]) => ({
    label: emoji,
    apply: `:${shortcode}:`
  }))

  return {
    from: match.from,
    options: completions
  }
}
