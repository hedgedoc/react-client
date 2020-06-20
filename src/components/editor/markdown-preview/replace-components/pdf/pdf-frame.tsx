import { DomElement } from 'domhandler'
import React, { ReactElement } from 'react'
import { OneClickEmbedding } from '../one-click-frame/one-click-embedding'
import { getIdFromCodiMdTag, VideoFrameProps } from '../video-util'
import './pdf-frame.scss'

const getElementReplacement = (node: DomElement, counterMap: Map<string, number>): (ReactElement | undefined) => {
  const pdfUrl = getIdFromCodiMdTag(node, 'pdf')
  if (pdfUrl) {
    const count = (counterMap.get(pdfUrl) || 0) + 1
    counterMap.set(pdfUrl, count)
    return <PdfFrame key={`pdf_${pdfUrl}_${count}`} id={pdfUrl}/>
  }
}

export const PdfFrame: React.FC<VideoFrameProps> = ({ id }) => {
  return (
    <OneClickEmbedding containerClassName={'embed-responsive embed-responsive-4by3'}
      previewContainerClassName={'embed-responsive-item bg-danger'} hoverIcon={'file-pdf-o'}
      loadingImageUrl={''}>
      <object type={'application/pdf'} data={id} className={'pdf-frame'}>
        PDF from <a href={id} rel='noopener noreferrer' target='_blank'>{id}</a>
      </object>
    </OneClickEmbedding>
  )
}

export { getElementReplacement as getPDFReplacement }
