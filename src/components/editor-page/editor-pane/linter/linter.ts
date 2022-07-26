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

export interface Linter {
  lint(view: EditorView): Diagnostic[]
}

export const useLinter = (linters: Linter[]): Extension => {
  return useMemo(() => linter((view) => linters.flatMap((aLinter) => aLinter.lint(view))), [linters])
}
