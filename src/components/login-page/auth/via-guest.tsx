/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Button } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { useDarkModeState } from '../../../hooks/common/use-dark-mode-state'

export const ViaGuest: React.FC = () => {
  const darkModeState = useDarkModeState()
  const router = useRouter()
  useTranslation()

  const onContinue = useCallback(async () => {
    await router.push('/history')
  }, [router])

  return (
    <div className={'d-flex flex-column w-100'}>
      <h5>
        <Trans i18nKey='login.guests' />
      </h5>
      <div className='flex flex-row' dir='auto'>
        <Button type='submit' variant={'primary'} onClick={onContinue}>
          <Trans i18nKey='login.continueAsGuest' />
        </Button>
      </div>
    </div>
  )
}
