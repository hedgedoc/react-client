/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback } from 'react'
import { HighlightedCode } from '../../../markdown-renderer/replace-components/highlighted-fence/highlighted-code/highlighted-code'
import { BasicMarkdownRenderer } from '../../../markdown-renderer/basic-markdown-renderer'

export interface CheatsheetLineProps {
  code: string,
  onTaskCheckedChange: (newValue: boolean) => void
}

export const CheatsheetLine: React.FC<CheatsheetLineProps> = ({ code, onTaskCheckedChange }) => {
  const checkboxClick = useCallback((lineInMarkdown: number, newValue: boolean) => {
    onTaskCheckedChange(newValue)
  }, [onTaskCheckedChange])

  return (
    <tr>
      <td>
        <BasicMarkdownRenderer
          content={ code }
          baseUrl={ 'https://example.org' }
          onTaskCheckedChange={ checkboxClick }/>
      </td>
      <td className={ 'markdown-body' }>
        <HighlightedCode code={ code } wrapLines={ true } startLineNumber={ 1 } language={ 'markdown' }/>
      </td>
    </tr>
  )
}
