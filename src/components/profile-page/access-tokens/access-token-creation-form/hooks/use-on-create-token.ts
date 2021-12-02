/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { FormEvent } from 'react'
import { useCallback } from 'react'
import { postNewAccessToken } from '../../../../../api/tokens'
import { showErrorNotification } from '../../../../../redux/ui-notifications/methods'
import type { AccessTokenWithSecret } from '../../../../../api/tokens/types'

export const useOnCreateToken = (
  label: string,
  expiryDate: string,
  setNewTokenWithSecret: (token: AccessTokenWithSecret) => void
): ((event: FormEvent) => void) => {
  return useCallback(
    (event: FormEvent) => {
      event.preventDefault()
      postNewAccessToken(label, expiryDate)
        .then((tokenWithSecret) => {
          setNewTokenWithSecret(tokenWithSecret)
        })
        .catch(showErrorNotification('profile.accessTokens.creationFailed'))
    },
    [expiryDate, label, setNewTokenWithSecret]
  )
}
