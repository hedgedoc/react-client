/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { apiUrl } from '../utils/api-url'

export const defaultFetchConfig: Partial<RequestInit> = {
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json'
  },
  redirect: 'follow',
  referrerPolicy: 'no-referrer',
  method: 'GET'
}

/**
 * Handles a request to the API while ensuring the response status is as expected and CSRF handling is done.
 *
 * @param apiRoute The API route to request. Example: 'notes/example-note/revisions'
 * @param requestOptions Additional request options (like headers and POST data) for the underlying fetch.
 * @param validResponseCode The expected response status code. Defaults to 200 if not defined.
 * @param responseCodeErrorMapping Mapping from invalid response codes to error messages that should be thrown.
 *
 * @return The response object received from the fetch call.
 *
 * @throws Error if the received response status code does not match the expected one.
 *         May contain a custom message if there is a message defined for the status code.
 */
export const doApiCall = async (
  apiRoute: string,
  requestOptions: Partial<RequestInit> = {},
  validResponseCode = 200,
  responseCodeErrorMapping: Record<number, string> = {}
): Promise<Response> => {
  // TODO Add CSRF handling
  const response = await fetch(apiUrl + apiRoute, {
    ...defaultFetchConfig,
    ...requestOptions
  })
  if (response.status !== validResponseCode) {
    if (responseCodeErrorMapping[response.status]) {
      throw new Error(responseCodeErrorMapping[response.status])
    } else {
      throw new Error(`Expected response status code ${validResponseCode} but received ${response.status}.`)
    }
  }
  return response
}

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
 * Retrieves data from the API without specifying advanced request options or sending data.
 *
 * @param apiRoute The API route to request data from.
 *
 * @return The parsed JSON response body data from the API.
 */
export const getApiResponse = async <ResponseType>(apiRoute: string): Promise<ResponseType> => {
  const response = await doApiCall(apiRoute, undefined, 200)
  return extractJsonResponse<ResponseType>(response)
}

/**
 * Sends data to the API.
 *
 * @param apiRoute The API route to send data to.
 * @param method The method to use. Example: POST or DELETE.
 * @param data The data to send.
 * @param validResponseCode The expected response code.
 * @param responseCodeErrorMapping A mapping from status codes to errors that can be thrown.
 *
 * @return The response object from the HTTP request.
 */
export const sendApiData = async <BodyData>(
  apiRoute: string,
  method: RequestInit['method'],
  data: BodyData,
  validResponseCode = 200,
  responseCodeErrorMapping: Record<number, string> = {}
): Promise<Response> => {
  return await doApiCall(
    apiRoute,
    {
      method,
      body: data !== undefined ? JSON.stringify(data) : undefined
    },
    validResponseCode,
    responseCodeErrorMapping
  )
}

/**
 * Sends data to the API and returns the parsed response.
 * @see {sendApiData}
 *
 * @return The parsed JSON response body data from the API.
 */
export const sendApiDataAndGetResponse = async <BodyData, ResponseType>(
  apiRoute: string,
  method: RequestInit['method'],
  data: BodyData,
  validResponseCode = 200,
  responseCodeErrorMapping: Record<number, string> = {}
): Promise<ResponseType> => {
  const response = await sendApiData(apiRoute, method, data, validResponseCode, responseCodeErrorMapping)
  return extractJsonResponse<ResponseType>(response)
}
