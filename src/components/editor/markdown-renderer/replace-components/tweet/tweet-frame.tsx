import React, { useCallback, useEffect, useMemo, useState } from 'react'
import './tweet-frame.scss'

export interface TweetFrameProps {
  id: string
}

interface resizeEvent {
  size: number
  id: string
}

export const TweetFrame: React.FC<TweetFrameProps> = ({ id }) => {
  const iframeHtml = useMemo(() => {
    return (`
      <html lang="en">
        <head>
          <base target="_parent">
          <title>tweet</title>
          <style>
            * { font-size:12px; }
            body{ overflow:hidden; margin: 0;}
          </style>
          <script type="text/javascript">
            function doLoad() {
                window.parent.postMessage({eventType: 'tweetResize', size: document.body.scrollHeight, id: '${id}'}, '*')
                tweakLinks();
            }
            function tweakLinks() {
                document.querySelectorAll("a").forEach((link) => {
                    link.rel="noopener noreferer"
                    link.target="_blank"
                })
            }
          </script>
        </head>
        <body onload="doLoad()">
          <blockquote class="twitter-tweet"><a href="https://twitter.com/null/status/${id}">tweet</a></blockquote>
          <script src="https://platform.twitter.com/widgets.js"></script>
        </body>
      </html>`)
  }, [id])

  const [frameHeight, setFrameHeight] = useState(0)

  const sizeMessage = useCallback((message: MessageEvent) => {
    const data = message.data as resizeEvent
    if (data.id !== id) {
      return
    }
    setFrameHeight(data.size)
  }, [id])

  useEffect(() => {
    window.addEventListener('message', sizeMessage)
    return () => {
      window.removeEventListener('message', sizeMessage)
    }
  }, [sizeMessage])

  return (
    <iframe
      sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups"
      width='100%'
      height={`${frameHeight}px`}
      frameBorder='0'
      title={`tweet ${id}`}
      src={`data:text/html;base64,${btoa(iframeHtml)}`}/>
  )
}
