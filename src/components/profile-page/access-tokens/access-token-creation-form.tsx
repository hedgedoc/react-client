/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { ChangeEvent, FormEvent } from 'react'
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { cypressId } from '../../../utils/cypress-attribute'
import { Trans, useTranslation } from 'react-i18next'
import { AccessTokenCreatedModal } from './access-token-created-modal'
import { DateTime } from 'luxon'
import type { AccessTokenWithSecret } from '../../../api/tokens/types'
import { postNewAccessToken } from '../../../api/tokens'
import { showErrorNotification } from '../../../redux/ui-notifications/methods'

/**
 * Form for creating a new access token.
 */
export const AccessTokenCreationForm: React.FC = () => {
  const { t } = useTranslation()
  const [newTokenLabel, setNewTokenLabel] = useState('')
  const [newTokenExpiry, setNewTokenExpiry] = useState('')
  const [newTokenWithSecret, setNewTokenWithSecret] = useState<AccessTokenWithSecret>()
  const [showCreatedModal, setShowCreatedModal] = useState(false)

  const onHideCratedModal = useCallback(() => {
    setShowCreatedModal(false)
  }, [])

  const onChangeTokenLabel = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setNewTokenLabel(event.target.value)
  }, [])

  const onChangeTokenExpiry = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setNewTokenExpiry(event.target.value)
  }, [])

  const onCreateToken = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      postNewAccessToken(newTokenLabel, newTokenExpiry)
        .then((tokenWithSecret) => {
          setNewTokenWithSecret(tokenWithSecret)
          setShowCreatedModal(true)
        })
        .catch(showErrorNotification('profile.accessTokens.creationFailed'))
    },
    [newTokenLabel, newTokenExpiry]
  )

  const newTokenCreatable = useMemo(() => {
    return newTokenLabel.trim() !== ''
  }, [newTokenLabel])

  const expiryDates = useMemo(() => {
    const today = DateTime.now()
    return {
      min: today.toISODate(),
      max: today
        .plus({
          year: 2
        })
        .toISODate(),
      default: today
        .plus({
          year: 1
        })
        .toISODate()
    }
  }, [])

  useEffect(() => {
    setNewTokenExpiry(expiryDates.default)
  }, [expiryDates])

  return (
    <Fragment>
      <h5>
        <Trans i18nKey={'profile.accessTokens.createToken'} />
      </h5>
      <Form onSubmit={onCreateToken} className='text-start'>
        <Form.Group>
          <Form.Label>
            <Trans i18nKey={'profile.accessTokens.label'} />
          </Form.Label>
          <Form.Control
            type='text'
            size='sm'
            placeholder={t('profile.accessTokens.label')}
            value={newTokenLabel}
            className='bg-dark text-light'
            onChange={onChangeTokenLabel}
            isValid={newTokenCreatable}
            required
            {...cypressId('access-token-add-input-label')}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            <Trans i18nKey={'profile.accessTokens.expiry'} />
          </Form.Label>
          <Form.Control
            type='date'
            size='sm'
            value={newTokenExpiry}
            className='bg-dark text-light'
            onChange={onChangeTokenExpiry}
            min={expiryDates.min}
            max={expiryDates.max}
            required
            {...cypressId('access-token-add-input-expiry')}
          />
        </Form.Group>
        <Button
          type='submit'
          variant='primary'
          size='sm'
          disabled={!newTokenCreatable}
          {...cypressId('access-token-add-button')}>
          <Trans i18nKey='profile.accessTokens.createToken' />
        </Button>
      </Form>
      <AccessTokenCreatedModal
        tokenWithSecret={newTokenWithSecret}
        show={showCreatedModal}
        onHide={onHideCratedModal}
      />
    </Fragment>
  )
}
