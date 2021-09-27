/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useEffect, useState } from 'react'
import { Trans } from 'react-i18next'
import { IconName } from '../../../common/fork-awesome/types'
import { ShowIf } from '../../../common/show-if/show-if'
import './one-click-embedding.scss'
import { ProxyImageFrame } from '../image/proxy-image-frame'
import { Logger } from '../../../../utils/logger'

const log = new Logger('OneClickEmbedding')

interface OneClickFrameProps {
  onImageFetch?: () => Promise<string>
  loadingImageUrl?: string
  hoverIcon?: IconName
  hoverTextI18nKey?: string
  tooltip?: string
  containerClassName?: string
  previewContainerClassName?: string
  onActivate?: () => void
}

export const OneClickEmbedding: React.FC<OneClickFrameProps> = ({
  previewContainerClassName,
  containerClassName,
  onImageFetch,
  loadingImageUrl,
  children,
  tooltip,
  hoverIcon,
  hoverTextI18nKey,
  onActivate
}) => {
  const [showFrame, setShowFrame] = useState(false)
  const [previewImageUrl, setPreviewImageUrl] = useState(loadingImageUrl)

  const showChildren = () => {
    setShowFrame(true)
    if (onActivate) {
      onActivate()
    }
  }

  useEffect(() => {
    if (!onImageFetch) {
      return
    }
    onImageFetch()
      .then((imageLink) => {
        setPreviewImageUrl(imageLink)
      })
      .catch((message) => {
        log.error(message)
      })
  }, [onImageFetch])

  return (
    <span className={containerClassName}>
      <ShowIf condition={showFrame}>{children}</ShowIf>
      <ShowIf condition={!showFrame}>
        <span className={`one-click-embedding ${previewContainerClassName || ''}`} onClick={showChildren}>
          <ShowIf condition={!!previewImageUrl}>
            <ProxyImageFrame
              className={'one-click-embedding-preview'}
              src={previewImageUrl}
              alt={tooltip || ''}
              title={tooltip || ''}
            />
          </ShowIf>
          <ShowIf condition={!!hoverIcon}>
            <span className='one-click-embedding-icon text-center'>
              <i className={`fa fa-${hoverIcon as string} fa-5x mb-2`} />
              <ShowIf condition={!!hoverTextI18nKey}>
                <br />
                <Trans i18nKey={hoverTextI18nKey} />
              </ShowIf>
            </span>
          </ShowIf>
        </span>
      </ShowIf>
    </span>
  )
}
