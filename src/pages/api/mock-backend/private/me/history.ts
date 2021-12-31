/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { NextApiRequest, NextApiResponse } from 'next'
import {
  HttpMethod,
  respondMethodNotAllowed,
  respondToMatchingRequest
} from '../../../../../handler-utils/respond-to-matching-request'
import type { HistoryEntry } from '../../../../../api/history/types'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  respondToMatchingRequest<HistoryEntry[]>(HttpMethod.GET, req, res, [
    {
      identifier: 'slide-example',
      title: 'Slide example',
      lastVisitedAt: '2020-05-30T15:20:36.088Z',
      pinStatus: true,
      tags: ['features', 'cool', 'updated']
    },
    {
      identifier: 'features',
      title: 'Features',
      lastVisitedAt: '2020-05-31T15:20:36.088Z',
      pinStatus: true,
      tags: ['features', 'cool', 'updated']
    },
    {
      identifier: 'ODakLc2MQkyyFc_Xmb53sg',
      title: 'Non existent',
      lastVisitedAt: '2020-05-25T19:48:14.025Z',
      pinStatus: false,
      tags: []
    },
    {
      identifier: 'l8JuWxApTR6Fqa0LCrpnLg',
      title: 'Non existent',
      lastVisitedAt: '2020-05-24T16:04:36.433Z',
      pinStatus: false,
      tags: ['agenda', 'HedgeDoc community', 'community call']
    }
  ]) || respondMethodNotAllowed(res)
}

export default handler
