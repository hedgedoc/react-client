/*
 SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)

 SPDX-License-Identifier: AGPL-3.0-only
 */

import type { ChangeEvent, FormEvent } from 'react'
import React, { useCallback, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { changePassword } from '../../../api/me'
import { showErrorNotification } from '../../../redux/ui-notifications/methods'

const REGEX_VALID_PASSWORD = /^[^\s].{5,}$/

/**
 * Profile page section for changing the password when using internal login.
 */
export const ProfileChangePassword: React.FC = () => {
  useTranslation()
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordAgain, setNewPasswordAgain] = useState('')
  const [newPasswordValid, setNewPasswordValid] = useState(false)
  const [newPasswordAgainValid, setNewPasswordAgainValid] = useState(false)

  const onChangeOldPassword = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setOldPassword(event.target.value)
  }, [])

  const onChangeNewPassword = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setNewPassword(event.target.value)
      setNewPasswordValid(REGEX_VALID_PASSWORD.test(event.target.value))
      setNewPasswordAgainValid(event.target.value === newPasswordAgain)
    },
    [newPasswordAgain]
  )

  const onChangeNewPasswordAgain = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setNewPasswordAgain(event.target.value)
      setNewPasswordAgainValid(event.target.value === newPassword)
    },
    [newPassword]
  )

  const onSubmitPasswordChange = useCallback(
    (event: FormEvent) => {
      event.preventDefault()
      changePassword(oldPassword, newPassword).catch(showErrorNotification('profile.changePassword.failed'))
    },
    [oldPassword, newPassword]
  )

  return (
    <Card className='bg-dark mb-4'>
      <Card.Body>
        <Card.Title>
          <Trans i18nKey='profile.changePassword.title' />
        </Card.Title>
        <Form onSubmit={onSubmitPasswordChange} className='text-left'>
          <Form.Group controlId='oldPassword'>
            <Form.Label>
              <Trans i18nKey='profile.changePassword.old' />
            </Form.Label>
            <Form.Control
              type='password'
              size='sm'
              className='bg-dark text-light'
              autoComplete='current-password'
              required
              onChange={onChangeOldPassword}
            />
          </Form.Group>
          <Form.Group controlId='newPassword'>
            <Form.Label>
              <Trans i18nKey='profile.changePassword.new' />
            </Form.Label>
            <Form.Control
              type='password'
              size='sm'
              className='bg-dark text-light'
              required
              onChange={onChangeNewPassword}
              isValid={newPasswordValid}
            />
            <Form.Text>
              <Trans i18nKey='profile.changePassword.info' />
            </Form.Text>
          </Form.Group>
          <Form.Group controlId='newPasswordAgain'>
            <Form.Label>
              <Trans i18nKey='profile.changePassword.newAgain' />
            </Form.Label>
            <Form.Control
              type='password'
              size='sm'
              className='bg-dark text-light'
              required
              onChange={onChangeNewPasswordAgain}
              isValid={newPasswordAgainValid}
              isInvalid={newPasswordAgain !== '' && !newPasswordAgainValid}
            />
          </Form.Group>

          <Button type='submit' variant='primary' disabled={!newPasswordValid || !newPasswordAgainValid}>
            <Trans i18nKey='common.save' />
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}
