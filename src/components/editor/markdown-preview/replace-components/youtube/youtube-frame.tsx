import { DomElement } from 'domhandler'
import React, { ReactElement, useState } from 'react'
import './youtube-frame.scss'
import { testSingleVideoParagraph, VideoFrameProps } from '../video_util'

const protocolRegex = /(?:http(?:s)?:\/\/)?/
const subdomainRegex = /(?:www.)?/
const domainRegex = /(?:youtube\.com\/(?:[^\\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)/
const idRegex = /([^"&?\\/\s]{11})/
const youtubeVideoUrlRegex = new RegExp(`(?:${protocolRegex.source}${subdomainRegex.source}${domainRegex.source}${idRegex.source})`)
const linkRegex = new RegExp(`^${youtubeVideoUrlRegex.source}$`)

const getElementReplacement = (node: DomElement): (ReactElement | undefined) => {
  const result = testSingleVideoParagraph(node, linkRegex)
  if (result) {
    return <YouTubeFrame key={result} id={result}/>
  }
}

export const YouTubeFrame: React.FC<VideoFrameProps> = ({ id }) => {
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
        : <span className="preview youtube" onClick={showVideo}>
          <img src={`//img.youtube.com/vi/${id}/hqdefault.jpg`} alt="youtube video"/>
          <i className="fa fa-youtube-play fa-5x"/>
        </span>
      }
    </p>
  )
}

export { getElementReplacement as getYouTubeReplacement }
