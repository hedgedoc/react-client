import { DomElement } from 'domhandler'
import React, { ReactElement, useEffect, useState } from 'react'
import { ShowIf } from '../../../../common/show-if/show-if'
import { testSingleVideoParagraph, VideoFrameProps } from '../video_util'

interface SlideshareAPIResponse {
  html: string
  // eslint-disable-next-line camelcase
  slide_image_baseurl: string
  // eslint-disable-next-line camelcase
  slide_image_baseurl_suffix: string
}

const getElementReplacement = (node: DomElement, counterMap: Map<string, number>): (ReactElement | undefined) => {
  const slideId = testSingleVideoParagraph(node, 'slideshare')
  if (slideId) {
    const count = (counterMap.get(slideId) || 0) + 1
    counterMap.set(slideId, count)
    return <SlideshareFrame key={`slideshare_${slideId}_${count}`} id={slideId}/>
  }
}

const getEmbedDataFromAPI = async (id: string): Promise<SlideshareAPIResponse> => {
  const response = await fetch(`https://www.slideshare.net/api/oembed/2?format=json&url=https://www.slideshare.net/${id}`, {
    credentials: 'omit',
    referrerPolicy: 'no-referrer'
  })
  if (response.status !== 200) {
    throw new Error('Error while loading data from SlideShare API')
  }
  const apiData = await response.json() as SlideshareAPIResponse
  if (apiData.html && apiData.slide_image_baseurl && apiData.slide_image_baseurl_suffix) {
    return apiData
  } else {
    throw new Error('Invalid response from SlideShare API')
  }
}

export const SlideshareFrame: React.FC<VideoFrameProps> = ({ id }) => {
  const [showFrame, setShowFrame] = useState(false)
  const [imageLink, setImageLink] = useState('data:image/gif;base64,R0lGODdhAQABAIABAAAAAP///ywAAAAAAQABAAACAkQBADs')
  const [iframeLink, setIframeLink] = useState('')

  const showEmbeddedContent = () => {
    setShowFrame(true)
  }

  useEffect(() => {
    getEmbedDataFromAPI(id).then(apiData => {
      setImageLink(`${apiData.slide_image_baseurl}1${apiData.slide_image_baseurl_suffix}`)
      // TODO Slideshare's API returns an HTML string with an iframe. Extract the iframe src url from that and set it to iframeLink.
    }).catch(message => console.error(message))
  }, [id])

  return (
    <p className='embed-responsive embed-responsive-4by3'>
      <ShowIf condition={showFrame}>
        <iframe className='embed-responsive-item' title={`SlideShare presentation ${id}`} width="100%"
          src={iframeLink}/>
      </ShowIf>
      <ShowIf condition={!showFrame}>
        <span className='preview slideshare embed-responsive-item' onClick={showEmbeddedContent}>
          <img src={imageLink} alt="SlideShare presentation"/>
          <i className="fa fa-slideshare fa-5x"/>
        </span>
      </ShowIf>
    </p>
  )
}

export { getElementReplacement as getSlideshareReplacement }
