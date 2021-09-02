/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useNoteMarkdownContent } from './use-note-markdown-content'
import { useApplicationState } from './use-application-state'
import { useMemo } from 'react'

export const useNoteMarkdownContentWithoutFrontmatter = (): string => {
  const markdownContent = useNoteMarkdownContent()
  const offsetLines = useApplicationState((state) => state.noteDetails.frontmatterRendererInfo.offsetLines)

  return useMemo(() => {
    return markdownContent.split('\n').slice(offsetLines).join('\n')
  }, [markdownContent, offsetLines])
}
