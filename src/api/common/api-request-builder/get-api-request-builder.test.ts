/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { expectFetch } from './test-utils/expect-fetch'
import { GetApiRequestBuilder } from './get-api-request-builder'

let originalFetch: typeof global['fetch']

beforeAll(() => {
  originalFetch = global.fetch
})

afterAll(() => {
  global.fetch = originalFetch
})

describe('GetApiRequestBuilder', () => {
  it('sendRequest', async () => {
    expectFetch('/api/mock-backend/private/test', 200, { method: 'GET' })
    await new GetApiRequestBuilder('test').sendRequest()
  })
})
