/*
SPDX-FileCopyrightText: 2020 The HedgeDoc developers (see AUTHORS file)

SPDX-License-Identifier: AGPL-3.0-only
*/

import { useLocation } from 'react-router'

export const useFrontendBaseUrl = (): string => {
  const { pathname } = useLocation()
  const loc = window.location
  const cleanedPathName = loc.pathname.replace(pathname, '')

  return `${loc.protocol}//${loc.host}${cleanedPathName}`
}
