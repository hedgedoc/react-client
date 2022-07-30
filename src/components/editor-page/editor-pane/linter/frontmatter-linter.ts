/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import type { Linter } from './linter'
import type { EditorView } from '@codemirror/view'
import type { Diagnostic } from '@codemirror/lint'
import { extractFrontmatter } from '../../../../redux/note-details/frontmatter-extractor/extractor'
import { load } from 'js-yaml'
import type { RawNoteFrontmatter } from '../../../../redux/note-details/raw-note-frontmatter-parser/types'
import { t } from 'i18next'

/**
 * Creates a {@link Linter linter} for the yaml frontmatter.
 */
export class FrontmatterLinter implements Linter {
  lint(view: EditorView): Diagnostic[] {
    const lines = view.state.doc.toString().split('\n')
    const frontmatterExtraction = extractFrontmatter(lines)
    if (!frontmatterExtraction.isPresent) {
      return []
    }
    const frontmatterLines = lines.slice(0, frontmatterExtraction.lineOffset + 1)
    const rawNoteFrontmatter = this.loadYaml(frontmatterExtraction.rawText)
    if (rawNoteFrontmatter === undefined) {
      // Could not parse frontmatter
      return [
        {
          from: 0,
          to: frontmatterLines.join('\n').length,
          message: t('editor.linter.frontmatter'),
          severity: 'error'
        }
      ]
    }
    if (typeof rawNoteFrontmatter.tags === 'string') {
      const tags: string[] = rawNoteFrontmatter?.tags?.split(',').map((entry) => entry.trim()) ?? []
      const replacedText = 'tags:\n- ' + tags.join('\n- ')
      const tagsLine = frontmatterLines.findIndex((value) => value.startsWith('tags: '))
      const before = frontmatterLines.slice(0, tagsLine)
      const from = before.join('\n').length
      const to = from + frontmatterLines[tagsLine].length + 1
      return [
        {
          from: from,
          to: to,
          actions: [
            {
              name: t('editor.linter.defaultAction'),
              apply: (view: EditorView, from: number, to: number) => {
                view.dispatch({
                  changes: { from, to, insert: replacedText }
                })
              }
            }
          ],
          message: t('editor.linter.frontmatter-tags'),
          severity: 'warning'
        }
      ]
    }
    return []
  }

  loadYaml(raw: string): RawNoteFrontmatter | undefined {
    try {
      return load(raw) as RawNoteFrontmatter
    } catch {
      return undefined
    }
  }
}
