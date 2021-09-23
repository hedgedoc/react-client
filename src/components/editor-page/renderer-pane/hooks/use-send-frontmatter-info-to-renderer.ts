/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useSendToRenderer } from '../../../render-page/window-post-message-communicator/hooks/use-send-to-renderer'
import { useMemo } from 'react'
import { CommunicationMessageType } from '../../../render-page/window-post-message-communicator/rendering-message'
import { useApplicationState } from '../../../../hooks/common/use-application-state'

export const useSendFrontmatterInfoToRenderer = (): void => {
  const frontmatterInfo = useApplicationState((state) => state.noteDetails.frontmatterRendererInfo)

  return useSendToRenderer(
    useMemo(
      () => ({
        type: CommunicationMessageType.SET_FRONTMATTER_INFO,
        frontmatterInfo
      }),
      [frontmatterInfo]
    )
  )
}
