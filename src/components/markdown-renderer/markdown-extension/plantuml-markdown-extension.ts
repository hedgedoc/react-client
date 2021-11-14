/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { MarkdownExtension } from './markdown-extension'
import type MarkdownIt from 'markdown-it'
import plantuml from 'markdown-it-plantuml'
import type { RenderRule } from 'markdown-it/lib/renderer'
import type Renderer from 'markdown-it/lib/renderer'
import type Token from 'markdown-it/lib/token'
import type { Options } from 'markdown-it/lib'

export class PlantumlMarkdownExtension extends MarkdownExtension {
  constructor(private plantumlServer: string | null) {
    super()
  }

  private plantumlError(markdownIt: MarkdownIt): void {
    const defaultRenderer: RenderRule = markdownIt.renderer.rules.fence || (() => '')
    markdownIt.renderer.rules.fence = (tokens: Token[], idx: number, options: Options, env, slf: Renderer) => {
      return tokens[idx].info === 'plantuml'
        ? "<p class='alert alert-danger'>PlantUML plugin is enabled but not properly configured.</p>"
        : defaultRenderer(tokens, idx, options, env, slf)
    }
  }

  public configureMarkdownIt(markdownIt: MarkdownIt): void {
    if (this.plantumlServer) {
      plantuml(markdownIt, {
        openMarker: '```plantuml',
        closeMarker: '```',
        server: this.plantumlServer
      })
    } else {
      this.plantumlError(markdownIt)
    }
  }
}
