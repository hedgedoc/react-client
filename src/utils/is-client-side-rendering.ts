/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

/**
 * Detects if the application is currently renders client side.
 */
export const isClientSideRendering = (): boolean => {
  return typeof window !== 'undefined' && typeof window.navigator !== 'undefined'
}
