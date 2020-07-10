import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getProxiedUrl } from '../../../../../api/imageProxy'
import { ApplicationState } from '../../../../../redux'

export const ImageFrame: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({ alt, src, ...props }) => {
  const [imageUrl, setImageUrl] = useState(src)
  const imageProxyEnabled = useSelector((state: ApplicationState) => state.backendConfig.imageProxy)

  useEffect(() => {
    if (!imageProxyEnabled || !imageUrl) {
      return
    }
    const fetchProxiedUrl = async (): Promise<void> => {
      const proxiedUrlResponse = await getProxiedUrl(imageUrl)
      setImageUrl(proxiedUrlResponse.src)
    }
    fetchProxiedUrl().catch(err => console.error(err))
  }, [imageUrl, imageProxyEnabled])

  return (
    <img alt={alt} src={imageUrl} {...props}/>
  )
}
