/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useAsync } from 'react-use'
import { getNote } from '../../../../api/notes'
import { setNoteDataFromServer } from '../../../../redux/note-details/methods'
import { useSingleStringUrlParameter } from '../../../../hooks/common/use-single-string-url-parameter'
import type { AsyncState } from 'react-use/lib/useAsyncFn'

/**
 * Reads the note id from the current URL, requests the note from the backend and writes it into the global application state.
 *
 * @return An {@link AsyncState async state} that represents the current state of the loading process.
 */
export const useLoadNoteFromServer = (): AsyncState<void> => {
  const id = useSingleStringUrlParameter('noteId', undefined)

  return useAsync(async () => {
    if (id === undefined) {
      throw new Error('Invalid id')
    }
    try {
      const noteFromServer = await getNote(id)
      setNoteDataFromServer(noteFromServer)
    } catch (error: unknown) {
      throw new Error('Error while fetching note from server.\n' + (error as Error).message)
    }
  }, [id])
}
