/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { ApiRequestBuilder } from './api-request-builder'
import type { ApiResponse } from '../api-response'

/**
 * Builder to construct a POST request to the API.
 *
 * @param ResponseType The type of the expected response.
 * @param RequestBodyType The type of the request body
 * @see {ApiRequestBuilder}
 */
export class PostApiRequestBuilder<ResponseType, RequestBodyType> extends ApiRequestBuilder<
  ResponseType,
  RequestBodyType
> {
  /**
   * @see {ApiRequestBuilder#sendRequest}
   */
  sendRequest(): Promise<ApiResponse<ResponseType>> {
    return this.sendRequestAndVerifyResponse('POST', 201)
  }
}
