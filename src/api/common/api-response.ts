/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

/**
 * Class that represents the response of an {@link ApiRequest}.
 */
export class ApiResponse {
  private readonly response: Response

  /**
   * Initializes a new API response instance based on a HTTP response.
   * @param response The HTTP response from the fetch call.
   */
  constructor(response: Response) {
    this.response = response
  }

  /**
   * Returns the raw response from the fetch call.
   *
   * @return The response from the fetch call.
   */
  getResponse(): Response {
    return this.response
  }

  /**
   * Returns the response as parsed JSON. An error will be thrown if the response is not JSON encoded.
   *
   * @return The parsed JSON response.
   * @throws Error if the response is not JSON encoded.
   */
  async getResponseJson<ResponseType>(): Promise<ResponseType> {
    if (!this.response.headers.get('Content-Type')?.startsWith('application/json')) {
      throw new Error('Response body does not seem to be JSON encoded.')
    }
    return (await this.response.json()) as ResponseType
  }
}
