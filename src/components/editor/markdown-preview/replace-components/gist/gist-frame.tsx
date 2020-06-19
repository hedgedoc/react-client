import React, { useCallback, useEffect, useMemo, useState } from 'react'

export interface GistFrameProps {
  id: string
}

interface resizeEvent {
  size: number
  id: string
}

export const GistFrame: React.FC<GistFrameProps> = ({ id }) => {
  const iframeHtml = useMemo(() => {
    return (`
      <html lang="en">
        <head>
          <base target="_parent">
          <title>gist</title>
          <style>
            * { font-size:12px; }
            body{ overflow:hidden; margin: 0;}
          </style>
        </head>
        <body onload="window.parent.postMessage({size: document.body.scrollHeight, id: '${id}'}, '*')">
          <script type="text/javascript" src="https://gist.github.com/${id}.js"></script>
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
      sandbox="allow-scripts"
      width='100%'
      height={`${frameHeight}px`}
      frameBorder='0'
      title={`gist ${id}`}
      src={`data:text/html;base64,${btoa(iframeHtml)}`}/>
  )
}
