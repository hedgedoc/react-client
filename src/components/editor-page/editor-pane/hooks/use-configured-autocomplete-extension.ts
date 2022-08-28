/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { Extension } from '@codemirror/state'
import { useMemo } from 'react'
import { autocompletion } from '@codemirror/autocomplete'
import { emojiAutocompletion } from '../autocompletion/emoji'

export const useConfiguredAutocompleteExtension = (): Extension => {
  return useMemo(() => {
    return autocompletion({
      icons: false,
      override: [emojiAutocompletion]
    })
  }, [])
}
