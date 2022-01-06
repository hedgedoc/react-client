/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { TaskCheckedChangeCallback } from '../../../markdown-renderer/markdown-extension/task-list/task-list-checkbox'
import { useApplicationState } from '../../../../hooks/common/use-application-state'
import { useMemo } from 'react'
import { setCheckboxInMarkdownContent } from '../../../../redux/note-details/methods'

export const useOnTaskCheckedChangeWithLineOffset = (): TaskCheckedChangeCallback | undefined => {
  const lineOffset = useApplicationState((state) => state.noteDetails.frontmatterRendererInfo.lineOffset)

  return useMemo(
    () => (lineInMarkdown: number, checked: boolean) => {
      setCheckboxInMarkdownContent(lineInMarkdown + lineOffset, checked)
    },
    [lineOffset]
  )
}
