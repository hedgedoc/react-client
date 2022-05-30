/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback } from 'react'
import { ToolbarButton } from '../toolbar-button'
import { wrapSelection } from '../formatters/wrap-selection'
import { changeCursorsToWholeLineIfNoToCursor } from '../formatters/utils/change-cursors-to-whole-line-if-no-to-cursor'
import type { GenerateContentEditsCallback } from '../../../change-content-context/change-content-context'

export const CollapsibleBlockButton: React.FC = () => {
  const formatter: GenerateContentEditsCallback = useCallback(({ currentSelection, markdownContent }) => {
    return wrapSelection(
      changeCursorsToWholeLineIfNoToCursor(markdownContent, currentSelection),
      '\n:::spoiler Toggle label\n',
      '\n:::\n'
    )
  }, [])
  return (
    <ToolbarButton i18nKey={'collapsibleBlock'} iconName={'caret-square-o-down'} formatter={formatter}></ToolbarButton>
  )
}
