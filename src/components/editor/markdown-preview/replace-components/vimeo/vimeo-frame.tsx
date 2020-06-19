import { DomElement } from 'domhandler'
import React, { ReactElement, useEffect, useState } from 'react'
import { ShowIf } from '../../../../common/show-if/show-if'
import '../../common-style/embedding-preview.scss'
import { testSingleVideoParagraph, VideoFrameProps } from '../video_util'

const getElementReplacement = (node: DomElement, counterMap: Map<string, number>): (ReactElement | undefined) => {
  const videoId = testSingleVideoParagraph(node, 'vimeo')
  if (videoId) {
    const count = (counterMap.get(videoId) || 0) + 1
    counterMap.set(videoId, count)
    return <VimeoFrame key={`vimeo_${videoId}_${count}`} id={videoId}/>
  }
}

interface VimeoApiResponse {
  // eslint-disable-next-line camelcase
  thumbnail_large?: string
}

const getPreviewImageLink = async (id: string): Promise<string> => {
  const response = await fetch(`https://vimeo.com/api/v2/video/${id}.json`, {
    credentials: 'omit',
    referrerPolicy: 'no-referrer'
  })
  if (response.status !== 200) {
    throw new Error('Error while loading data from vimeo api')
  }
  const vimeoResponse: VimeoApiResponse[] = await response.json() as VimeoApiResponse[]

  if (vimeoResponse[0] && vimeoResponse[0].thumbnail_large) {
    return vimeoResponse[0].thumbnail_large
  } else {
    throw new Error('Invalid vimeo response')
  }
}

export const VimeoFrame: React.FC<VideoFrameProps> = ({ id }) => {
  const [showFrame, setShowFrame] = useState(false)
  const [imageLink, setImageLink] = useState('https://i.vimeocdn.com/video/')

  const showVideo = () => {
    setShowFrame(true)
  }

  useEffect(() => {
    getPreviewImageLink(id).then((imageLink) => {
      setImageLink(imageLink)
    }).catch((message) => {
      console.error(message)
    })
  }, [id])

  return (
    <span className='embed-responsive embed-responsive-16by9'>
      <ShowIf condition={showFrame}>
        <iframe className='embed-responsive-item' title={`youtube video of ${id}`} width="560" height="315"
          src={`https://player.vimeo.com/video/${id}?autoplay=1`}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"/>
      </ShowIf>
      <ShowIf condition={!showFrame}>
        <span className="preview vimeo embed-responsive-item" onClick={showVideo}>
          <img src={imageLink} alt="vimeo video"/>
          <i className="fa fa-vimeo-square fa-5x"/>
        </span>
      </ShowIf>
    </span>
  )
}

export { getElementReplacement as getVimeoReplacement }
