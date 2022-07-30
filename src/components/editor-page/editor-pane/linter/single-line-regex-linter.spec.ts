/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { SingleLineRegexLinter } from './single-line-regex-linter'
import { mockEditorView } from './util.spec'
import type { Diagnostic } from '@codemirror/lint'
import { mockI18n } from '../../../markdown-renderer/test-utils/mock-i18n'

const testSingleLineRegexLinter = (
  regex: RegExp,
  replace: (match: string) => string,
  content: string,
  diagnostics: Partial<Diagnostic>[]
): void => {
  const singleLineRegexLinter = new SingleLineRegexLinter(regex, 'message', replace, 'actionLabel')
  const editorView = mockEditorView(content)
  const calculatedDiagnostics = singleLineRegexLinter.lint(editorView)
  expect(calculatedDiagnostics).toHaveLength(diagnostics.length)
  for (let x = 0; x < calculatedDiagnostics.length; x++) {
    expect(calculatedDiagnostics[x].from).toEqual(diagnostics[x].from)
    expect(calculatedDiagnostics[x].to).toEqual(diagnostics[x].to)
    expect(calculatedDiagnostics[x].message).toEqual('message')
    expect(calculatedDiagnostics[x].severity).toEqual('warning')
    expect(calculatedDiagnostics[x].actions).toHaveLength(1)
    expect(calculatedDiagnostics[x].actions?.[0].name).toEqual('actionLabel')
  }
}

describe('SingleLineRegexLinter', () => {
  beforeAll(async () => {
    await mockI18n()
  })
  it('works for a simple regex', () => {
    testSingleLineRegexLinter(/^foo$/, () => 'bar', 'This\nis\na\ntest\nfoo\nbar\n123', [
      {
        from: 15,
        to: 18
      }
    ])
  })
  it('works for a multiple hits', () => {
    testSingleLineRegexLinter(/^foo$/, () => 'bar', 'This\nfoo\na\ntest\nfoo\nbar\n123', [
      {
        from: 5,
        to: 8
      },
      {
        from: 16,
        to: 19
      }
    ])
  })
  it('work if there are no hits', () => {
    testSingleLineRegexLinter(/^nothing$/, () => 'bar', 'This\nfoo\na\ntest\nfoo\nbar\n123', [])
  })
})
