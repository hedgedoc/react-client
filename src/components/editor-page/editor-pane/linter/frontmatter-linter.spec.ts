/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { mockI18n } from '../../../markdown-renderer/test-utils/mock-i18n'
import type { Diagnostic } from '@codemirror/lint'
import { mockEditorView } from './util.spec'
import { FrontmatterLinter } from './frontmatter-linter'
import { t } from 'i18next'

const testFrontmatterLinter = (content: string, diagnostics: Partial<Diagnostic>, replace?: string): void => {
  const frontmatterLinter = new FrontmatterLinter()
  const editorView = mockEditorView(content)
  const spy = jest.spyOn(editorView, 'dispatch')
  const calculatedDiagnostics = frontmatterLinter.lint(editorView)
  expect(calculatedDiagnostics).toHaveLength(1)
  expect(calculatedDiagnostics[0].from).toEqual(diagnostics.from)
  expect(calculatedDiagnostics[0].to).toEqual(diagnostics.to)
  expect(calculatedDiagnostics[0].severity).toEqual(diagnostics.severity)
  if (replace !== undefined) {
    expect(calculatedDiagnostics[0].actions).toHaveLength(1)
    expect(calculatedDiagnostics[0].actions?.[0].name).toEqual(t('editor.linter.defaultAction'))
    calculatedDiagnostics[0].actions?.[0].apply(editorView, calculatedDiagnostics[0].from, calculatedDiagnostics[0].to)
    expect(spy).toHaveBeenCalledWith({
      changes: {
        from: calculatedDiagnostics[0].from,
        to: calculatedDiagnostics[0].to,
        insert: replace
      }
    })
  }
}

describe('FrontmatterLinter', () => {
  beforeAll(async () => {
    await mockI18n()
  })
  describe('with invalid tags', () => {
    it('(one)', () => {
      testFrontmatterLinter(
        '---\ntags: a\n---',
        {
          from: 3,
          to: 11,
          severity: 'warning'
        },
        'tags:\n- a'
      )
    })
    it('(mutliple)', () => {
      testFrontmatterLinter(
        '---\ntags: 123, a\n---',
        {
          from: 3,
          to: 16,
          severity: 'warning'
        },
        'tags:\n- 123\n- a'
      )
    })
  })
  it('with invalid yaml', () => {
    testFrontmatterLinter('---\n1\n  2: 3\n---', {
      from: 0,
      to: 16,
      severity: 'error'
    })
  })
})
