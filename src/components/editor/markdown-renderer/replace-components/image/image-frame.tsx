import React from 'react'

export interface ImageFrameProps {
  src: string
  className?: string
  id?: string
  alt?: string
  width?: string
  height?: string
}

export const ImageFrame: React.FC<ImageFrameProps> = ({ src, className, id, alt, width, height }) => {
  return (
    <img
      id={id}
      className={className}
      src={src}
      alt={alt}
      width={width}
      height={height}
    />
  )
}
