import { DomElement } from 'domhandler'
import React, { ReactElement } from 'react'
import { OneClickEmbedding } from '../one-click-frame/one-click-embedding'
import { getIdFromCodiMdTag, VideoFrameProps } from '../video-util'
import './pdf-frame.scss'

const getElementReplacement = (node: DomElement, counterMap: Map<string, number>): (ReactElement | undefined) => {
  const videoId = getIdFromCodiMdTag(node, 'pdf')
  if (videoId) {
    const count = (counterMap.get(videoId) || 0) + 1
    counterMap.set(videoId, count)
    return <PdfFrame key={`youtube_${videoId}_${count}`} id={videoId}/>
  }
}

export const PdfFrame: React.FC<VideoFrameProps> = ({ id }) => {
  return (
    <OneClickEmbedding containerClassName={'embed-responsive embed-responsive-16by9'}
      previewContainerClassName={'embed-responsive-item bg-danger'} hoverIcon={'file-pdf-o'}
      loadingImageUrl={''}>
      <object type={'application/pdf'} data={id} className={'pdf-frame'}>
        PDF from {id}
      </object>
    </OneClickEmbedding>
  )
}

export { getElementReplacement as getPDFReplacement }
