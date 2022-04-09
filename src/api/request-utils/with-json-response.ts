/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { AdditionalApiRequestOptions } from './index'
import { doApiDeleteRequest, doApiGetRequest, doApiPostRequest, doApiPutRequest } from './index'

/**
 * Extracts and parses the JSON content from a given response.
 *
 * @param response The response object that should contain the JSON data as body.
 *
 * @return The parsed data.
 *
 * @throws Error if the response does not contain JSON body content.
 *         This is determined by the received Content-Type header.
 */
export const extractJsonResponse = async <ResponseType>(response: Response): Promise<ResponseType> => {
  if (!response.headers.get('Content-Type')?.startsWith('application/json')) {
    throw new Error('API did not respond with valid JSON data.')
  }
  return (await response.json()) as Promise<ResponseType>
}

/**
 * Starts an HTTP GET request against the backend API and parses the response as JSON.
 *
 * @param apiRoute The API route to request. Example: 'notes/example-note/revisions'
 * @param additionalApiRequestOptions Additional options for the request processing like response code override, error mapping and additional request settings.
 *
 * @return The response object received from the fetch call.
 *
 * @throws Error if the received response status code does not match the expected one.
 *         May contain a custom message if there is a message defined for the status code.
 */
export const doApiGetRequestWithJsonResponse = async <ReturnData>(
  apiRoute: string,
  additionalApiRequestOptions?: AdditionalApiRequestOptions
): Promise<ReturnData> => {
  const response = await doApiGetRequest(apiRoute, additionalApiRequestOptions)
  return extractJsonResponse(response)
}

/**
 * Starts an HTTP POST request against the backend API and parses the response as JSON.
 *
 * @param apiRoute The API route to request. Example: 'notes/example-note/revisions'
 * @param body The request body to send
 * @param additionalApiRequestOptions Additional options for the request processing like response code override, error mapping and additional request settings.
 *
 * @return The response object received from the fetch call.
 *
 * @throws Error if the received response status code does not match the expected one.
 *         May contain a custom message if there is a message defined for the status code.
 */
export const doApiPostRequestWithJsonResponse = async <BodyData, ReturnData>(
  apiRoute: string,
  body: BodyData,
  additionalApiRequestOptions?: AdditionalApiRequestOptions
): Promise<ReturnData> => {
  const response = await doApiPostRequest(apiRoute, body, additionalApiRequestOptions)
  return extractJsonResponse(response)
}

/**
 * Starts an HTTP DELETE request against the backend API and parses the response as JSON.
 *
 * @param apiRoute The API route to request. Example: 'notes/example-note/revisions'
 * @param additionalApiRequestOptions Additional options for the request processing like response code override, error mapping and additional request settings.
 *
 * @return The response object received from the fetch call.
 *
 * @throws Error if the received response status code does not match the expected one.
 *         May contain a custom message if there is a message defined for the status code.
 */
export const doApiDeleteRequestWithJsonResponse = async <ReturnData>(
  apiRoute: string,
  additionalApiRequestOptions?: AdditionalApiRequestOptions
): Promise<ReturnData> => {
  const response = await doApiDeleteRequest(apiRoute, additionalApiRequestOptions)
  return extractJsonResponse(response)
}

/**
 * Starts an HTTP PUT request against the backend API and parses the response as JSON.
 *
 * @param apiRoute The API route to request. Example: 'notes/example-note/revisions'
 * @param body The request body to send
 * @param additionalApiRequestOptions Additional options for the request processing like response code override, error mapping and additional request settings.
 *
 * @return The response object received from the fetch call.
 *
 * @throws Error if the received response status code does not match the expected one.
 *         May contain a custom message if there is a message defined for the status code.
 */
export const doApiPutRequestWithJsonResponse = async <BodyData, ReturnData>(
  apiRoute: string,
  body: BodyData,
  additionalApiRequestOptions?: AdditionalApiRequestOptions
): Promise<ReturnData> => {
  const response = await doApiPutRequest(apiRoute, additionalApiRequestOptions)
  return extractJsonResponse(response)
}
