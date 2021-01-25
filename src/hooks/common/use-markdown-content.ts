/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useSelector } from 'react-redux'
import { ApplicationState } from '../../redux'

export const useMarkdownContent = (): string => {
  return useSelector((state: ApplicationState) => state.noteContent.markdownContent)
}
