/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { MarkdownExtension } from '../markdown-extension'
import type MarkdownIt from 'markdown-it'
import { legacyPdfRegex, legacyPdfShortCode } from './replace-legacy-pdf-short-code'
import { legacySlideshareRegex, legacySlideshareShortCode } from './replace-legacy-slideshare-short-code'
import { legacySpeakerdeckRegex, legacySpeakerdeckShortCode } from './replace-legacy-speakerdeck-short-code'
import { SingleLineRegexLinter } from '../../../editor-page/editor-pane/linter/single-line-regex-linter'
import type { Linter } from '../../../editor-page/editor-pane/linter/linter'

/**
 * Adds support for legacy shortcodes (pdf, slideshare and speakerdeck) by replacing them with anchor elements.
 */
export class LegacyShortcodesMarkdownExtension extends MarkdownExtension {
  public configureMarkdownIt(markdownIt: MarkdownIt): void {
    legacyPdfShortCode(markdownIt)
    legacySlideshareShortCode(markdownIt)
    legacySpeakerdeckShortCode(markdownIt)
  }

  public buildLinter(): Linter[] {
    return [
      new SingleLineRegexLinter(
        legacySpeakerdeckRegex,
        'editor.linter.speakerdeck',
        (match: string) => `https://speakerdeck.com/${match}`
      ),
      new SingleLineRegexLinter(
        legacySlideshareRegex,
        'editor.linter.slideshare',
        (match: string) => `https://www.slideshare.net/${match}`
      ),
      new SingleLineRegexLinter(legacyPdfRegex, 'editor.linter.pdf', (match: string) => match)
    ]
  }
}
