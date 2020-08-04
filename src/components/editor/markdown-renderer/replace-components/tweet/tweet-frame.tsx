import React, { useCallback } from 'react'
import './tweet-frame.scss'

export interface TweetFrameProps {
  id: string
}

export const TweetFrame: React.FC<TweetFrameProps> = ({ id }) => {
  const onIframeLoad = useCallback((event: React.SyntheticEvent<HTMLIFrameElement>) => {
    const frame = event.target as HTMLIFrameElement
    const height = frame.contentWindow?.document.body.scrollHeight
    frame.style.height = `${height ?? 0}px`
  }, [])

  return (
    <iframe className='tweet-embed'
      src={`https://platform.twitter.com/embed/index.html?dnt=true&id=${id}`}
      title={`tweet ${id}`}
      onLoad={onIframeLoad}>
      <a href={`https://twitter.com/api/status/${id}`}>{`https://twitter.com/api/status/${id}`}</a>
    </iframe>
  )
}
