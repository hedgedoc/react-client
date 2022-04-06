/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { MarkdownExtension } from './markdown-extension'
import type MarkdownIt from 'markdown-it'
import markdownItContainer from 'markdown-it-container'
import type Token from 'markdown-it/lib/token'
import { escapeHtml } from 'markdown-it/lib/common/utils'

export class SpoilerMarkdownExtension extends MarkdownExtension {
  private static readonly spoilerRegEx = /^spoiler\s+(.*)$/

  /**
   * Renders the opening and closing token of the container.
   *
   * @param tokens The tokens of the document
   * @param index The currently viewed token
   * @return The html rendering of the tokens
   */
  private static renderSpoilerContainer(tokens: Token[], index: number): string {
    const matches = SpoilerMarkdownExtension.spoilerRegEx.exec(tokens[index].info.trim())

    return tokens[index].nesting === 1 && matches && matches[1]
      ? `<details><summary>${escapeHtml(matches[1])}</summary>`
      : '</details>\n'
  }

  public configureMarkdownIt(markdownIt: MarkdownIt): void {
    markdownItContainer(markdownIt, 'spoiler', {
      validate: (params: string) => SpoilerMarkdownExtension.spoilerRegEx.test(params),
      render: SpoilerMarkdownExtension.renderSpoilerContainer.bind(this)
    })
  }
}
