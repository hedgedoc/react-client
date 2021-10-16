/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { isTestMode } from './test-modes'

interface PropsWithDataCy {
  'data-cy'?: string | undefined
}

/**
 * Returns an object with the "data-cy" attribute that is used to find
 * elements for integration tests.
 * This works only if the runtime is built in test mode.
 *
 * @param identifier The identifier that is used to find the element
 * @return An object if in test mode, undefined otherwise.
 */
export const testId = (identifier: string | undefined | PropsWithDataCy): Record<'data-cy', string> | undefined => {
  if (!isTestMode() || !identifier) {
    return
  }

  const attributeContent = typeof identifier === 'string' ? identifier : identifier['data-cy']

  if (attributeContent !== undefined) {
    return { 'data-cy': attributeContent }
  }
}
