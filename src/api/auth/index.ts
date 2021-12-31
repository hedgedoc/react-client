/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { sendApiData } from '../utils'

/**
 * Requests to log out the current user.
 * @throws Error if logout is not possible.
 */
export const doLogout = (): Promise<unknown> => {
  return sendApiData<undefined>('auth/logout', 'DELETE', undefined, 204)
}
