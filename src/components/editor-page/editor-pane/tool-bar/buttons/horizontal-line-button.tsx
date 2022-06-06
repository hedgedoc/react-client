/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback } from 'react'
import { ToolbarButton } from '../toolbar-button'
import type { GenerateContentEditsCallback } from '../../../change-content-context/change-content-context'
import { replaceSelection } from '../formatters/replace-selection'

export const HorizontalLineButton: React.FC = () => {
  const formatter: GenerateContentEditsCallback = useCallback(({ currentSelection }) => {
    return replaceSelection({ from: currentSelection.to ?? currentSelection.from }, '----\n', true)
  }, [])
  return <ToolbarButton i18nKey={'horizontalLine'} iconName={'minus'} formatter={formatter}></ToolbarButton>
}
