/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react'
import { cypressId } from '../../../../utils/cypress-attribute'
import { Trans } from 'react-i18next'
import { Button } from 'react-bootstrap'

/**
 * Submit button for creating a new access token.
 */
export const AccessTokenCreationFormSubmitButton: React.FC = () => {
  return (
    <Button type='submit' variant='primary' size='sm' {...cypressId('access-token-add-button')}>
      <Trans i18nKey='profile.accessTokens.createToken' />
    </Button>
  )
}
