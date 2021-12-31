/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { NextApiRequest, NextApiResponse } from 'next'

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

/**
 * Intercepts a mock HTTP request to check the used request method.
 * @param method The expected HTTP method.
 * @param req The request object.
 * @param res The response object.
 * @param response The response data that will be returned when the HTTP method was the expected one.
 * @param statusCode The status code with which the response will be sent.
 * @return true if the HTTP method of the request is the expected one, false otherwise.
 */
export const respondToMatchingRequest = <T>(
  method: HttpMethod,
  req: NextApiRequest,
  res: NextApiResponse,
  response: T,
  statusCode = 200
): boolean => {
  if (method !== req.method) {
    return false
  } else {
    res.status(statusCode).json(response)
    return true
  }
}

/**
 * HTTP Handler that responds with a status code of HTTP 405 Method Not Allowed.
 * @param res The response object to use.
 */
export const respondMethodNotAllowed = (res: NextApiResponse): void => {
  res.status(405).send('Method not allowed')
}
