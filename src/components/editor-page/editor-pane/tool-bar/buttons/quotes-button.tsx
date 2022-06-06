/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback } from 'react'
import { ToolbarButton } from '../toolbar-button'
import type { GenerateContentEditsCallback } from '../../../change-content-context/change-content-context'
import { prependLinesOfSelection } from '../formatters/prepend-lines-of-selection'

export const QuotesButton: React.FC = () => {
  const formatter: GenerateContentEditsCallback = useCallback(({ currentSelection, markdownContent }) => {
    return prependLinesOfSelection(markdownContent, currentSelection, () => `> `)
  }, [])
  return <ToolbarButton i18nKey={'blockquote'} iconName={'quote-right'} formatter={formatter}></ToolbarButton>
}
