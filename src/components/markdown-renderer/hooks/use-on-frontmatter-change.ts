/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useOnRefChange } from './use-on-ref-change'
import { NoteFrontmatter, RawNoteFrontmatter } from '../../editor-page/note-frontmatter/note-frontmatter'
import { MutableRefObject } from 'react'

export const useOnFrontmatterChange = (rawMetaRef: MutableRefObject<RawNoteFrontmatter|undefined> ,    onFrontmatterChange?: (frontmatter: NoteFrontmatter | undefined) => void): void => {
  useOnRefChange(rawMetaRef, (newValue) => {
    if (!newValue) {
      onFrontmatterChange?.(undefined)
    } else {
      onFrontmatterChange?.(new NoteFrontmatter(newValue))
    }
  })
}
