/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { Element } from 'domhandler'
import type MarkdownIt from 'markdown-it'
import markdownItRegex from 'markdown-it-regex'
import React from 'react'
import { ComponentReplacer } from '../ComponentReplacer'
import { OneClickEmbedding } from '../one-click-frame/one-click-embedding'
import { getAttributesFromHedgeDocTag } from '../utils'
import { GistFrame } from './gist-frame'
import preview from './gist-preview.png'
import { replaceGistLink } from './replace-gist-link'
import { replaceLegacyGistShortCode } from './replace-legacy-gist-short-code'

/**
 * Detects "app-gist" tags and renders them as gist frames.
 */
export class GistReplacer extends ComponentReplacer {
  public static readonly markdownItPlugin: MarkdownIt.PluginSimple = (markdownIt) => {
    markdownItRegex(markdownIt, replaceGistLink)
    markdownItRegex(markdownIt, replaceLegacyGistShortCode)
  }

  public getReplacement(node: Element): React.ReactElement | undefined {
    const attributes = getAttributesFromHedgeDocTag(node, 'gist')
    if (attributes && attributes.id) {
      const gistId = attributes.id
      return (
        <OneClickEmbedding
          previewContainerClassName={'gist-frame'}
          loadingImageUrl={preview}
          hoverIcon={'github'}
          tooltip={'click to load gist'}>
          <GistFrame id={gistId} />
        </OneClickEmbedding>
      )
    }
  }
}
