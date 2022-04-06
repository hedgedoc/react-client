/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useEffect, useState } from 'react'
import { getProxiedUrl } from '../../../../api/media'
import { useApplicationState } from '../../../../hooks/common/use-application-state'
import { Logger } from '../../../../utils/logger'

const log = new Logger('ProxyImageFrame')

export const ProxyImageFrame: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({ src, title, alt, ...props }) => {
  const [imageUrl, setImageUrl] = useState('')
  const imageProxyEnabled = useApplicationState((state) => state.config.useImageProxy)

  useEffect(() => {
    if (!imageProxyEnabled || !src) {
      return
    }
    getProxiedUrl(src)
      .then((proxyResponse) => setImageUrl(proxyResponse.src))
      .catch((err) => log.error(err))
  }, [imageProxyEnabled, src])

  // The next image processor works with a whitelist of origins. Therefore we can't use it for general images.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={imageProxyEnabled ? imageUrl : src ?? ''} title={title ?? alt ?? ''} alt={alt} {...props} />
}
