import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getProxiedUrl } from '../../../../../api/imageProxy'
import { ApplicationState } from '../../../../../redux'

export const ImageFrame: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({ alt, src, ...props }) => {
  const [imageUrl, setImageUrl] = useState('')
  const imageProxyEnabled = useSelector((state: ApplicationState) => state.backendConfig.imageProxy)

  useEffect(() => {
    if (!imageProxyEnabled || !src) {
      setImageUrl(src || '')
      return
    }
    getProxiedUrl(src).then(proxyResponse => setImageUrl(proxyResponse.src)).catch(err => console.error(err))
  }, [src, imageProxyEnabled])

  return (
    <img alt={alt} src={imageUrl} {...props}/>
  )
}
