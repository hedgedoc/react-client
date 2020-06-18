import { DomElement } from 'domhandler'
import React, { ReactElement, useState } from 'react'
import './vimeo-frame.scss'
import { testSingleVideoParagraph, VideoFrameProps } from '../video_util'

const protocolRegex = /(?:http(?:s)?:\/\/)?/
const domainRegex = /(?:vimeo\.com\/)/
const idRegex = /([\d]{8})/
const vimeoVideoUrlRegex = new RegExp(`(?:${protocolRegex.source}${domainRegex.source}${idRegex.source})`)
const linkRegex = new RegExp(`^${vimeoVideoUrlRegex.source}$`)

const getElementReplacement = (node: DomElement): (ReactElement | undefined) => {
  const result = testSingleVideoParagraph(node, linkRegex)
  if (result) {
    return <VimeoFrame key={result} id={result}/>
  }
}

export const VimeoFrame: React.FC<VideoFrameProps> = ({ id }) => {
  const [showFrame, setShowFrame] = useState(false)

  const showVideo = () => {
    setShowFrame(true)
  }

  return (
    <p>
      {showFrame
        ? <iframe frameBorder='0' title={`youtube video of ${id}`} width="560" height="315"
          src={`https://www.youtube.com/embed/${id}?autoplay=1`}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"/>
        : <span className="preview vimeo" onClick={showVideo}>
          <img src={`//img.youtube.com/vi/${id}/hqdefault.jpg`} alt="youtube video"/>
          <i className="fa fa-vimeo fa-5x"/>
        </span>
      }
    </p>
  )
}

export { getElementReplacement as getVimeoReplacement }
