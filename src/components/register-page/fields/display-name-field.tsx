/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useMemo } from 'react'
import type { RegisterFieldProps } from './fields'
import { Form } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'

/**
 * Renders an input field for the display name when registering.
 * @param onChange Hook that is called when the entered display name changes.
 * @param value The currently entered display name.
 */
export const DisplayNameField: React.FC<RegisterFieldProps> = ({ onChange, value }) => {
  const { t } = useTranslation()

  const isValid = useMemo(() => {
    return value.trim() !== ''
  }, [value])

  return (
    <Form.Group>
      <Form.Label>
        <Trans i18nKey='profile.displayName' />
      </Form.Label>
      <Form.Control
        type='text'
        size='sm'
        value={value}
        isValid={isValid}
        onChange={onChange}
        placeholder={t('profile.displayName')}
        className='bg-dark text-light'
        autoComplete='name'
        required
      />
      <Form.Text>
        <Trans i18nKey='profile.displayNameInfo' />
      </Form.Text>
    </Form.Group>
  )
}
