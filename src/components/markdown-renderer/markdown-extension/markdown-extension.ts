/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type MarkdownIt from 'markdown-it'
import type { NodeProcessor } from '../node-preprocessors/node-processor'
import type { ComponentReplacer } from '../replace-components/component-replacer'

export abstract class MarkdownExtension {
  public configureMarkdownIt(markdownIt: MarkdownIt): void {
    return
  }

  public configureMarkdownItPost(markdownIt: MarkdownIt): void {
    return
  }

  public buildNodeProcessors(): NodeProcessor[] {
    return []
  }

  public buildReplacers(): ComponentReplacer[] {
    return []
  }

  public buildTagNameWhitelist(): string[] {
    return []
  }
}
