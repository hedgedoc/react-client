/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { StringMap, TOptionsBase } from 'i18next'
import type { IconName } from '../fork-awesome/fork-awesome-icon'

interface GeneralLinkProp {
  href: string
  icon?: IconName
  id?: string
  className?: string
  title?: string
}

export interface LinkWithTextProps extends GeneralLinkProp {
  text: string
}

export interface TranslatedLinkProps extends GeneralLinkProp {
  i18nKey: string
  i18nOption?: (TOptionsBase & StringMap) | string
}
