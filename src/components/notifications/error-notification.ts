/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import i18n from 'i18next'
import { dispatchUiNotification } from '../../redux/ui-notifications/methods'

// Promises catch errors as any.
// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
export const showErrorNotification = (message: string) => (error: any): void => {
  console.error(message, error)
  dispatchUiNotification(i18n.t('common.errorOccurred'), message, undefined, 'exclamation-triangle')
}
