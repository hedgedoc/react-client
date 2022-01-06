/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { Suspense, useCallback, useMemo, useState } from 'react'
import { Table } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import styles from './cheatsheet.module.scss'
import { WaitSpinner } from '../../../common/wait-spinner/wait-spinner'
import { TaskListCheckboxChangeCallbackProvider } from '../../../markdown-renderer/markdown-extension/task-list/task-list-checkbox-change-callback-context'
import type { TaskCheckedChangeCallback } from '../../../markdown-renderer/markdown-extension/task-list/task-list-checkbox'

const CheatsheetLine = React.lazy(() => import('./cheatsheet-line'))

export const CheatsheetTabContent: React.FC = () => {
  const { t } = useTranslation()
  const [checked, setChecked] = useState<boolean>(false)
  const codes = useMemo(
    () => [
      `**${t('editor.editorToolbar.bold')}**`,
      `*${t('editor.editorToolbar.italic')}*`,
      `++${t('editor.editorToolbar.underline')}++`,
      `~~${t('editor.editorToolbar.strikethrough')}~~`,
      'H~2~O',
      '19^th^',
      `==${t('editor.help.cheatsheet.highlightedText')}==`,
      `# ${t('editor.editorToolbar.header')}`,
      `\`${t('editor.editorToolbar.code')}\``,
      '```javascript=\nvar x = 5;\n```',
      `> ${t('editor.editorToolbar.blockquote')}`,
      `- ${t('editor.editorToolbar.unorderedList')}`,
      `1. ${t('editor.editorToolbar.orderedList')}`,
      `- [${checked ? 'x' : ' '}] ${t('editor.editorToolbar.checkList')}`,
      `[${t('editor.editorToolbar.link')}](https://example.com)`,
      `![${t('editor.editorToolbar.image')}](/icons/apple-touch-icon.png)`,
      ':smile:',
      `:::info\n${t('editor.help.cheatsheet.exampleAlert')}\n:::`
    ],
    [checked, t]
  )

  const checkboxClick: TaskCheckedChangeCallback = useCallback((lineInMarkdown, checked) => setChecked(checked), [])

  const cheatsheetLines = useMemo(() => {
    return codes.map((code) => <CheatsheetLine markdown={code} key={code} />)
  }, [codes])

  return (
    <Suspense fallback={<WaitSpinner />}>
      <Table className={`table-condensed ${styles['table-cheatsheet']}`}>
        <thead>
          <tr>
            <th>
              <Trans i18nKey='editor.help.cheatsheet.example' />
            </th>
            <th>
              <Trans i18nKey='editor.help.cheatsheet.syntax' />
            </th>
          </tr>
        </thead>
        <tbody>
          <TaskListCheckboxChangeCallbackProvider onTaskCheckedChange={checkboxClick}>
            {cheatsheetLines}
          </TaskListCheckboxChangeCallbackProvider>
        </tbody>
      </Table>
    </Suspense>
  )
}
