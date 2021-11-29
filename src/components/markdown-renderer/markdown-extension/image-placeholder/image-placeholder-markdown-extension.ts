/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { MarkdownExtension } from '../markdown-extension'
import { imagePlaceholderMarkdownPlugin } from './image-placeholder-markdown-plugin'
import type MarkdownIt from 'markdown-it/lib'
import type { ComponentReplacer } from '../../replace-components/component-replacer'
import { ImagePlaceholderReplacer } from './image-placeholder-replacer'

export class ImagePlaceholderMarkdownExtension extends MarkdownExtension {
  configureMarkdownIt(markdownIt: MarkdownIt): void {
    imagePlaceholderMarkdownPlugin(markdownIt)
  }

  buildReplacers(): ComponentReplacer[] {
    return [new ImagePlaceholderReplacer()]
  }
}
