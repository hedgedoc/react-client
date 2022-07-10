/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback } from 'react'
import { ToolbarButton } from '../toolbar-button'
import type { ContentFormatter } from '../../../change-content-context/change-content-context'
import { prependLinesOfSelection } from '../formatters/prepend-lines-of-selection'

/**
 * Renders a button to insert an ordered list.
 */
export const OrderedListButton: React.FC = () => {
  const formatter: ContentFormatter = useCallback(({ currentSelection, markdownContent }) => {
    return prependLinesOfSelection(
      markdownContent,
      currentSelection,
      (line, lineIndexInBlock) => `${lineIndexInBlock + 1}. `
    )
  }, [])
  return <ToolbarButton i18nKey={'orderedList'} iconName={'list-ol'} formatter={formatter}></ToolbarButton>
}
