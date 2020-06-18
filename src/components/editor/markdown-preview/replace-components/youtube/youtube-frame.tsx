import { DomElement } from 'domhandler'
import React, { ReactElement, useState } from 'react'
import { ShowIf } from '../../../../common/show-if/show-if'
import { testSingleVideoParagraph, VideoFrameProps } from '../video_util'
import '../../common-style/video-embedding.scss'

const getElementReplacement = (node: DomElement, counterMap: Map<string, number>): (ReactElement | undefined) => {
  const videoId = testSingleVideoParagraph(node, 'youtube')
  if (videoId) {
    const count = (counterMap.get(videoId) || 0) + 1
    counterMap.set(videoId, count)
    return <YouTubeFrame key={`youtube_${videoId}_${count}`} id={videoId}/>
  }
}

export const YouTubeFrame: React.FC<VideoFrameProps> = ({ id }) => {
  const [showFrame, setShowFrame] = useState(false)

  const showVideo = () => {
    setShowFrame(true)
  }

  return (
    <p className='embed-responsive embed-responsive-16by9'>
      <ShowIf condition={showFrame}>
        <iframe className='embed-responsive-item' title={`youtube video of ${id}`} width="100%"
          src={`//www.youtube-nocookie.com/embed/${id}?autoplay=1`}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"/>
      </ShowIf>
      <ShowIf condition={!showFrame}>
        <span className='preview youtube embed-responsive-item' onClick={showVideo}>
          <img src={`//i.ytimg.com/vi/${id}/maxresdefault.jpg`} alt="youtube video"/>
          <i className="fa fa-youtube-play fa-5x"/>
        </span>
      </ShowIf>
    </p>
  )
}

export { getElementReplacement as getYouTubeReplacement }
