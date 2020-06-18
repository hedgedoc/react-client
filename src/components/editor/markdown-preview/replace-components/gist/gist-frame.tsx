import { DomElement } from 'domhandler'
import React, { ReactElement, useCallback, useEffect, useMemo, useState } from 'react'
import { testSingleVideoParagraph } from '../video_util'

export interface GistFrameProps {
    id: string
}

const getElementReplacement = (node: DomElement, counterMap: Map<string, number>): (ReactElement | undefined) => {
  const gistId = testSingleVideoParagraph(node, 'gist')
  if (gistId) {
    const count = (counterMap.get(gistId) || 0) + 1
    counterMap.set(gistId, count)
    return <GistFrame key={`gist_${gistId}_${count}`} id={gistId}/>
  }
}

interface resizeEvent {
  size: number
  id: string
}

export const GistFrame: React.FC<GistFrameProps> = ({ id }) => {
  const iframeHtml = useMemo(() => {
    const gistLink = `https://gist.github.com/${id}.js`
    const gistScript = `<script type="text/javascript" src="${gistLink}"></script>`
    const styles = '<style>*{font-size:12px;}\nbody{overflow:hidden}</style>'
    const resizeScript = `onload="window.parent.postMessage({size: document.body.scrollHeight, id: '${id}'}, '*')"`
    return `<html><head><base target="_parent">${styles}</head><body ${resizeScript}>${gistScript}</body></html>`
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

export { getElementReplacement as getGistReplacement }
