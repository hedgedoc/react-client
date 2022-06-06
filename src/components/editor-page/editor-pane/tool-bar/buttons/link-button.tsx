/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback } from 'react'
import { ToolbarButton } from '../toolbar-button'
import type { GenerateContentEditsCallback } from '../../../change-content-context/change-content-context'
import { addLink } from '../formatters/add-link'

export const LinkButton: React.FC = () => {
  const formatter: GenerateContentEditsCallback = useCallback(({ currentSelection, markdownContent }) => {
    return addLink(markdownContent, currentSelection)
  }, [])
  return <ToolbarButton i18nKey={'link'} iconName={'link'} formatter={formatter}></ToolbarButton>
}
