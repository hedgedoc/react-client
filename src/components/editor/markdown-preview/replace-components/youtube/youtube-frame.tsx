import { DomElement } from 'domhandler'
import React, { ReactElement } from 'react'
import { OneClickEmbedding } from '../one-click-frame/one-click-embedding'
import { testSingleVideoParagraph, VideoFrameProps } from '../video_util'

const getElementReplacement = (node: DomElement, counterMap: Map<string, number>): (ReactElement | undefined) => {
  const videoId = testSingleVideoParagraph(node, 'youtube')
  if (videoId) {
    const count = (counterMap.get(videoId) || 0) + 1
    counterMap.set(videoId, count)
    return <YouTubeFrame key={`youtube_${videoId}_${count}`} id={videoId}/>
  }
}

export const YouTubeFrame: React.FC<VideoFrameProps> = ({ id }) => {
  return (
    <OneClickEmbedding containerClassName={'embed-responsive embed-responsive-16by9'} previewClassName={'embed-responsive-item'} hoverIcon={'youtube-play'} loadingImageUrl={`//i.ytimg.com/vi/${id}/maxresdefault.jpg`}>
      <iframe className='embed-responsive-item' title={`youtube video of ${id}`}
        src={`//www.youtube-nocookie.com/embed/${id}?autoplay=1`}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"/>
    </OneClickEmbedding>
  )
}

export { getElementReplacement as getYouTubeReplacement }
