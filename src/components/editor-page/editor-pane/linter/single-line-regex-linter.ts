/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { Linter } from './linter'
import type { EditorView } from '@codemirror/view'
import type { Diagnostic } from '@codemirror/lint'
import { t } from 'i18next'

export class SingleLineRegexLinter implements Linter {
  constructor(
    private regex: RegExp,
    private message: string,
    private replace: (match: string) => string,
    private actionLabel?: string
  ) {}

  lint(view: EditorView): Diagnostic[] {
    const lines = view.state.doc.toString().split('\n')
    const diagnostics: Diagnostic[] = []
    let from = 0
    lines.forEach((line) => {
      const found = this.regex.exec(line)
      if (found !== null && found.length !== 0) {
        diagnostics.push(this.createDiagnostic(from, found))
      }
      from += line.length + 1
    })
    return diagnostics
  }

  createDiagnostic(from: number, found: RegExpExecArray): Diagnostic {
    const replacedText = this.replace(found[1])
    return {
      from: from,
      to: from + found[0].length,
      actions: [
        {
          name: t(this.actionLabel ?? 'Fix'),
          apply: (view: EditorView, from: number, to: number) => {
            view.dispatch({
              changes: { from, to, insert: replacedText }
            })
          }
        }
      ],
      message: this.message,
      severity: 'warning'
    }
  }
}
