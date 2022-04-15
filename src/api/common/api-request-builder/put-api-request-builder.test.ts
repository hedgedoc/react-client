/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { expectFetch } from './test-utils/expect-fetch'
import { PutApiRequestBuilder } from './put-api-request-builder'

let originalFetch: typeof global['fetch']

beforeAll(() => {
  originalFetch = global.fetch
})

afterAll(() => {
  global.fetch = originalFetch
})

describe('PutApiRequestBuilder', () => {
  it('sendRequest', async () => {
    expectFetch('/api/mock-backend/private/test', 200, { method: 'PUT' })
    await new PutApiRequestBuilder('test').sendRequest()
  })
})
