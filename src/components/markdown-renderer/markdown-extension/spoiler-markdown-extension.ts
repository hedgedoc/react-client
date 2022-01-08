/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
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

    return SpoilerMarkdownExtension.isOpeningToken(tokens, index) && matches && matches[1]
      ? `<details><summary>${escapeHtml(matches[1])}</summary>`
      : '</details>\n'
  }

  /**
   * Checks if the {@link Token token} at the given index is an opening token.
   * @param tokens The tokens of the document
   * @param index The index of the token that is currently viewed
   * @return {@code true} if the token is an opening token. {@code false} otherwise.
   */
  private static isOpeningToken(tokens: Token[], index: number): boolean {
    return tokens[index].nesting === 1
  }

  public configureMarkdownIt(markdownIt: MarkdownIt): void {
    markdownItContainer(markdownIt, 'spoiler', {
      validate: (params: string) => SpoilerMarkdownExtension.spoilerRegEx.test(params),
      render: SpoilerMarkdownExtension.renderSpoilerContainer.bind(this)
    })
  }
}
