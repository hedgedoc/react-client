/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { ChangeEvent, Fragment, useCallback, useMemo, useState } from 'react'
import { Form } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { AccessTokenCreatedModal } from '../access-token-created-modal'
import type { AccessTokenWithSecret } from '../../../../api/tokens/types'
import { AccessTokenCreationFormLabelField } from './access-token-creation-form-label-field'
import { AccessTokenCreationFormExpiryField } from './access-token-creation-form-expiry-field'
import { AccessTokenCreationFormSubmitButton } from './access-token-creation-form-submit-button'
import { useExpiryDates } from './hooks/use-expiry-dates'
import { useOnCreateToken } from './hooks/use-on-create-token'

interface NewTokenFormValues {
  label: string
  expiryDate: string
}

/**
 * Form for creating a new access token.
 */
export const AccessTokenCreationForm: React.FC = () => {
  useTranslation()
  const expiryDates = useExpiryDates()

  const formValuesInitialState = useMemo(() => {
    return {
      expiryDate: expiryDates.default,
      label: ''
    }
  }, [expiryDates])

  const [formValues, setFormValues] = useState<NewTokenFormValues>(() => formValuesInitialState)
  const [newTokenWithSecret, setNewTokenWithSecret] = useState<AccessTokenWithSecret>()

  const onHideCreatedModal = useCallback(() => {
    setFormValues(formValuesInitialState)
    setNewTokenWithSecret(undefined)
  }, [formValuesInitialState])

  const onCreateToken = useOnCreateToken(formValues.label, formValues.expiryDate, setNewTokenWithSecret)

  const onChangeExpiry = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setFormValues((previousValues) => {
      return {
        ...previousValues,
        expiryDate: event.target.value
      }
    })
  }, [])

  const onChangeLabel = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setFormValues((previousValues) => {
      return {
        ...previousValues,
        label: event.target.value
      }
    })
  }, [])

  return (
    <Fragment>
      <h5>
        <Trans i18nKey={'profile.accessTokens.createToken'} />
      </h5>
      <Form onSubmit={onCreateToken} className='text-start'>
        <AccessTokenCreationFormLabelField onChangeLabel={onChangeLabel} formValues={formValues} />
        <AccessTokenCreationFormExpiryField onChangeExpiry={onChangeExpiry} formValues={formValues} />
        <AccessTokenCreationFormSubmitButton />
      </Form>
      <AccessTokenCreatedModal
        tokenWithSecret={newTokenWithSecret}
        show={!!newTokenWithSecret}
        onHide={onHideCreatedModal}
      />
    </Fragment>
  )
}
