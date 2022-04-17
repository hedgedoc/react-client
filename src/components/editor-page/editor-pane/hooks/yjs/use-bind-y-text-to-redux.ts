/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useEffect } from 'react'
import { setNoteContent } from '../../../../../redux/note-details/methods'
import type { YText } from 'yjs/dist/src/types/YText'

/**
 * One-Way-synchronizes the text of the given {@link YText y-text} into the global application state.
 *4
 * @param yText The source text
 */
export const useBindYTextToRedux = (yText: YText): void => {
  useEffect(() => {
    const yTextCallback = () => setNoteContent(yText.toString())
    yText.observe(yTextCallback)
    return () => yText.unobserve(yTextCallback)
  }, [yText])
}
