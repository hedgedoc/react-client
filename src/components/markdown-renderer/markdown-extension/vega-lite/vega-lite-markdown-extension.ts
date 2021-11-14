/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { MarkdownExtension } from '../markdown-extension'
import { CodeBlockComponentReplacer } from '../../replace-components/code-block-component-replacer'
import type { ComponentReplacer } from '../../replace-components/component-replacer'
import { VegaLiteChart } from './vega-lite-chart'

/**
 * Adds support for chart rendering using vega lite to the markdown rendering using code fences with "vega-lite" as language.
 */
export class VegaLiteMarkdownExtension extends MarkdownExtension {
  public buildReplacers(): ComponentReplacer[] {
    return [new CodeBlockComponentReplacer(VegaLiteChart, 'vega-lite')]
  }
}
