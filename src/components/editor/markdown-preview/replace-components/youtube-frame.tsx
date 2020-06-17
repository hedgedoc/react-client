import { DomElement } from 'domhandler'
import React, { ReactElement, useState } from 'react'
import './youtube-frame.scss'

const protocolRegex = /(?:http(?:s)?:\/\/)?/
const subdomainRegex = /(?:www.)?/
const domainRegex = /(?:youtube\.com\/(?:[^\\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)/
const idRegex = /([^"&?\\/\s]{11})/
const youtubeVideoUrlRegex = new RegExp(`(?:${protocolRegex.source}${subdomainRegex.source}${domainRegex.source}${idRegex.source})`)
const linkRegex = new RegExp(`^${youtubeVideoUrlRegex.source}$`)

export interface YouTubeFrameProps {
  id: string
}

const getElementReplacement = (node: DomElement): (ReactElement | undefined) => {
  const result = testSingleVideoParagraph(node, linkRegex)
  if (result) {
    return <YouTubeFrame key={result} id={result}/>
  }
}

export const testSingleVideoParagraph = (node: DomElement, regex: RegExp): (string | undefined) => {
  if (!node.name || node.name !== 'p') {
    return
  }
  if (!node.children || node.children.length !== 1) {
    return
  }
  const childTag = node.children[0]
  if (childTag.name !== 'a') {
    return
  }
  if (!childTag.attribs || !childTag.attribs.href) {
    return
  }
  if (!regex.test(childTag.attribs.href)) {
    return
  }
  if (!childTag.children || !childTag.children[0] || childTag.children[0].type !== 'text') {
    return
  }
  if (!childTag.children[0].data || childTag.children[0].data !== childTag.attribs.href) {
    return
  }
  const matches = regex.exec(childTag.attribs.href)
  if (!matches) {
    return
  }
  return matches[1]
}

export const YouTubeFrame: React.FC<YouTubeFrameProps> = ({ id }) => {
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
