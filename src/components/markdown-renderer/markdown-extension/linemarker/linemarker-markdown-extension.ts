/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { MarkdownExtension } from '../markdown-extension'
import { LinemarkerReplacer } from './linemarker-replacer'
import type { ComponentReplacer } from '../../replace-components/component-replacer'
import type { LineMarkers } from './add-line-marker-markdown-it-plugin'
import { addLineMarkerMarkdownItPlugin } from './add-line-marker-markdown-it-plugin'
import type MarkdownIt from 'markdown-it'

/**
 * Adds support for the generation of line marker elements which are needed for synced scrolling.
 */
export class LinemarkerMarkdownExtension extends MarkdownExtension {
  public static readonly tagName = 'app-linemarker'

  constructor(private lineOffset: number, private onLineMarkers?: (lineMarkers: LineMarkers[]) => void) {
    super()
  }

  public configureMarkdownIt(markdownIt: MarkdownIt): void {
    addLineMarkerMarkdownItPlugin(markdownIt, this.lineOffset ?? 0, this.onLineMarkers)
  }

  public buildReplacers(): ComponentReplacer[] {
    return [new LinemarkerReplacer()]
  }

  public buildTagNameWhitelist(): string[] {
    return [LinemarkerMarkdownExtension.tagName]
  }
}
