/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { Diagnostic } from '@codemirror/lint'
import { linter } from '@codemirror/lint'
import { useMemo } from 'react'
import type { Extension } from '@codemirror/state'
import type { EditorView } from '@codemirror/view'
import { legacyYouTubeRegex } from '../../../markdown-renderer/markdown-extension/youtube/replace-legacy-youtube-short-code'
import { legacyVimeoRegex } from '../../../markdown-renderer/markdown-extension/vimeo/replace-legacy-vimeo-short-code'
import { legacySpeakerdeckRegex } from '../../../markdown-renderer/markdown-extension/legacy-short-codes/replace-legacy-speakerdeck-short-code'
import { legacySlideshareRegex } from '../../../markdown-renderer/markdown-extension/legacy-short-codes/replace-legacy-slideshare-short-code'
import { legacyPdfRegex } from '../../../markdown-renderer/markdown-extension/legacy-short-codes/replace-legacy-pdf-short-code'

export interface LinterFunction {
  regex: RegExp
  message: string
  replace: (match: string) => string
  actionLabel?: string
}

const linterFunctions: LinterFunction[] = [
  {
    // old YouTube syntax
    regex: legacyYouTubeRegex,
    message: 'Legacy YouTube',
    replace: (match: string) => `https://www.youtube.com/watch?v=${match}`
  },
  {
    // old Vimeo syntax
    regex: legacyVimeoRegex,
    message: 'Legacy Vimeo',
    replace: (match: string) => `https://player.vimeo.com/video/${match}`
  },
  {
    // old SpeakerDeck syntax
    regex: legacySpeakerdeckRegex,
    message: 'Legacy SpeakerDeck',
    replace: (match: string) => `https://speakerdeck.com/${match}`
  },
  {
    // old SlideShare syntax
    regex: legacySlideshareRegex,
    message: 'Legacy SlideShare',
    replace: (match: string) => `https://www.slideshare.net/${match}`
  },
  {
    // old pdf syntax
    regex: legacyPdfRegex,
    message: 'Legacy PDF',
    replace: (match: string) => match
  },
  {
    // old sequence diagram
    regex: /```sequence/,
    message: 'renderer.sequence.deprecationWarning',
    replace: () => '```mermaid\nsequenceDiagram'
  }
]

export const useLinter = (): Extension => {
  return useMemo(
    () =>
      linter((view) => {
        const diagnostics: Diagnostic[] = []
        const lines = view.state.doc.toString().split('\n')
        if (lines[0].startsWith('---')) {
          // Frontmatter
        }
        let from = 0
        lines.forEach((line) => {
          for (const linterFunction of linterFunctions) {
            const found = linterFunction.regex.exec(line)
            if (found && found.length !== 0) {
              const replacedText = linterFunction.replace(found[1])
              diagnostics.push({
                from: from,
                to: from + found[0].length,
                actions: [
                  {
                    name: linterFunction.actionLabel ?? 'Fix',
                    apply: (view: EditorView, from: number, to: number) => {
                      view.dispatch({
                        changes: { from, to, insert: replacedText }
                      })
                    }
                  }
                ],
                message: linterFunction.message,
                severity: 'warning'
              })
              break
            }
          }
          from += line.length + 1
        })

        return diagnostics
      }),
    []
  )
}
