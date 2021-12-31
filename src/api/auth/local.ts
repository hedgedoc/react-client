/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { sendApiData } from '../utils'
import type { ChangePasswordDto, LoginDto, RegisterDto } from './types'
import { AuthError, RegisterError } from './types'

/**
 * Requests to do a local login with a provided username and password.
 * @param username The username for which the login should be tried.
 * @param password The password which should be used to log in.
 * @throws {AuthError.INVALID_CREDENTIALS} when the username or password is wrong.
 * @throws {AuthError.LOGIN_DISABLED} when the local login is disabled on the backend.
 */
export const doLocalLogin = (username: string, password: string): Promise<unknown> => {
  return sendApiData<LoginDto>('auth/local/login', 'POST', { username, password }, 201, {
    400: AuthError.LOGIN_DISABLED,
    401: AuthError.INVALID_CREDENTIALS
  })
}

/**
 * Requests to register a new local user in the backend.
 * @param username The username of the new user.
 * @param displayName The display name of the new user.
 * @param password The password of the new user.
 * @throws {RegisterError.USERNAME_EXISTING} when there is already an existing user with the same username.
 * @throws {RegisterError.REGISTRATION_DISABLED} when the registration of local users has been disabled on the backend.
 */
export const doLocalRegister = (username: string, displayName: string, password: string): Promise<unknown> => {
  return sendApiData<RegisterDto>(
    'auth/local',
    'POST',
    {
      username,
      displayName,
      password
    },
    201,
    {
      400: RegisterError.REGISTRATION_DISABLED,
      409: RegisterError.USERNAME_EXISTING
    }
  )
}

/**
 * Requests to update the user's current password to a new one.
 * @param currentPassword The current password of the user for confirmation.
 * @param newPassword The new password of the user.
 * @throws {AuthError.INVALID_CREDENTIALS} when the current password is wrong.
 * @throws {AuthError.LOGIN_DISABLED} when local login is disabled on the backend.
 */
export const doLocalPasswordChange = async (currentPassword: string, newPassword: string): Promise<unknown> => {
  return sendApiData<ChangePasswordDto>(
    'auth/local',
    'PUT',
    {
      currentPassword,
      newPassword
    },
    200,
    {
      400: AuthError.LOGIN_DISABLED,
      401: AuthError.INVALID_CREDENTIALS
    }
  )
}
