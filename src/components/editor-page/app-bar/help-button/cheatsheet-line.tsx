/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useMemo } from 'react'
import { useConvertMarkdownToReactDom } from '../../../markdown-renderer/hooks/use-convert-markdown-to-react-dom'
import { TaskListMarkdownExtension } from '../../../markdown-renderer/markdown-extension/task-list/task-list-markdown-extension'
import { HighlightedCode } from '../../../markdown-renderer/markdown-extension/highlighted-fence/highlighted-code'
import { AlertMarkdownExtension } from '../../../markdown-renderer/markdown-extension/alert-markdown-extension'
import { EmojiMarkdownExtension } from '../../../markdown-renderer/markdown-extension/emoji/emoji-markdown-extension'
import { HighlightedCodeMarkdownExtension } from '../../../markdown-renderer/markdown-extension/highlighted-fence/highlighted-code-markdown-extension'

export interface CheatsheetLineProps {
  markdown: string
}

const extensions = [
  new TaskListMarkdownExtension(),
  new HighlightedCodeMarkdownExtension(),
  new AlertMarkdownExtension(),
  new EmojiMarkdownExtension()
]

export const CheatsheetLine: React.FC<CheatsheetLineProps> = ({ markdown }) => {
  const lines = useMemo(() => markdown.split('\n'), [markdown])

  const markdownReactDom = useConvertMarkdownToReactDom(lines, extensions, true)

  return (
    <tr>
      <td>
        <div className={`markdown-body`}>{markdownReactDom}</div>
      </td>
      <td>
        <HighlightedCode code={markdown} wrapLines={true} startLineNumber={1} language={'markdown'} />
      </td>
    </tr>
  )
}

export default CheatsheetLine
