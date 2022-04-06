/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { LoginProvider } from '../../redux/user/types'

export interface UserResponse {
  id: string
  name: string
  photo: string
  provider: LoginProvider
}

export interface UserInfoDto {
  username: string
  displayName: string
  photo: string
  email: string
}
