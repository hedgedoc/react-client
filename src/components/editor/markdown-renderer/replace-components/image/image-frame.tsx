import React from 'react'

export interface ImageFrameProps {
  src: string
  className?: string
  id?: string
  alt?: string
}

export const ImageFrame: React.FC<ImageFrameProps> = ({ src, className, id, alt }) => {
  return (
    <p className="wider-possible">
      <img
        id={id}
        className={className}
        src={src}
        alt={alt}
      />
    </p>
  )
}
