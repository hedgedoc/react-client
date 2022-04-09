/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { apiUrl } from '../../utils/api-url'
import deepmerge from 'deepmerge'

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

export interface AdditionalApiRequestOptions {
  additionalRequestInit?: Partial<Omit<RequestInit, 'method'>>
  responseCodeErrorMapping?: Record<number, string>
  customExpectedResponseCode?: number
}

/**
 * Handles a request to the API while ensuring the response status is as expected and CSRF handling is done.
 *
 * @param apiRoute The API route to request. Example: 'notes/example-note/revisions'
 * @param method The HTTP method for the request
 * @param defaultExpectedResponseCode The expected response status code. Defaults to 200 if not defined
 * @param additionalRequestInit Additional parameters for the underlying fetch
 * @param customExpectedResponseCode An override for the expected response code
 * @param responseCodeErrorMapping Mapping from invalid response codes to error messages that should be thrown.
 *
 * @return The response object received from the fetch call.
 *
 * @throws Error if the received response status code does not match the expected one.
 *         May contain a custom message if there is a message defined for the status code.
 */
export const doApiRequest = async (
  apiRoute: string,
  method: 'GET' | 'POST' | 'DELETE' | 'PUT',
  defaultExpectedResponseCode = 200,
  { additionalRequestInit, customExpectedResponseCode, responseCodeErrorMapping }: AdditionalApiRequestOptions = {}
): Promise<Response> => {
  // TODO Add CSRF handling (hedgedoc/hedgedoc#221)

  const requestInit = {
    ...deepmerge<RequestInit>(defaultFetchConfig, additionalRequestInit ?? {}),
    method
  }
  const response = await fetch(apiUrl + apiRoute, requestInit)
  const expectedResponseCode = customExpectedResponseCode ?? defaultExpectedResponseCode
  if (expectedResponseCode !== response.status) {
    throw new Error(`Expected response status code ${expectedResponseCode} but received ${response.status}.`)
  }

  if (responseCodeErrorMapping !== undefined && response.status !== expectedResponseCode) {
    if (responseCodeErrorMapping[response.status]) {
      throw new Error(responseCodeErrorMapping[response.status])
    } else {
      throw new Error(`Expected response status code ${expectedResponseCode} but received ${response.status}.`)
    }
  }

  return response
}

/**
 * Starts an HTTP GET request against the backend API.
 *
 * @param apiRoute The API route to request. Example: 'notes/example-note/revisions'
 * @param additionalApiRequestOptions Additional options for the request processing like response code override, error mapping and additional request settings.
 *
 * @return The response object received from the fetch call.
 *
 * @throws Error if the received response status code does not match the expected one.
 *         May contain a custom message if there is a message defined for the status code.
 */
export const doApiGetRequest = async (
  apiRoute: string,
  additionalApiRequestOptions?: AdditionalApiRequestOptions
): Promise<Response> => {
  return await doApiRequest(apiRoute, 'GET', 200, additionalApiRequestOptions)
}

/**
 * Starts an HTTP POST request against the backend API
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
export const doApiPostRequest = async <BodyData>(
  apiRoute: string,
  body: BodyData,
  additionalApiRequestOptions: AdditionalApiRequestOptions = {}
): Promise<Response> => {
  const requestOptions = deepmerge<AdditionalApiRequestOptions>(additionalApiRequestOptions ?? {}, {
    additionalRequestInit: { body: JSON.stringify(body) }
  })
  return await doApiRequest(apiRoute, 'POST', 201, requestOptions)
}

/**
 * Starts an HTTP DELETE request against the backend API
 *
 * @param apiRoute The API route to request. Example: 'notes/example-note/revisions'
 * @param additionalApiRequestOptions Additional options for the request processing like response code override, error mapping and additional request settings.
 *
 * @return The response object received from the fetch call.
 *
 * @throws Error if the received response status code does not match the expected one.
 *         May contain a custom message if there is a message defined for the status code.
 */
export const doApiDeleteRequest = async (
  apiRoute: string,
  additionalApiRequestOptions?: AdditionalApiRequestOptions
): Promise<Response> => {
  return await doApiRequest(apiRoute, 'DELETE', 204, additionalApiRequestOptions)
}

/**
 * Starts an HTTP PUT request against the backend API
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
export const doApiPutRequest = async <BodyData>(
  apiRoute: string,
  body: BodyData,
  additionalApiRequestOptions?: AdditionalApiRequestOptions
): Promise<Response> => {
  return await doApiRequest(apiRoute, 'PUT', 200, {
    ...additionalApiRequestOptions,
    additionalRequestInit: {
      ...additionalApiRequestOptions?.additionalRequestInit,
      body: JSON.stringify(body)
    }
  })
}
