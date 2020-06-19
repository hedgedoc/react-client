import { DomElement } from 'domhandler'
import React, { ReactElement } from 'react'
import { OneClickEmbedding } from '../one-click-frame/one-click-embedding'
import { testSingleVideoParagraph } from '../video_util'
import { GistFrame } from './gist-frame'
import preview from './gist-preview.png'

const getElementReplacement = (node: DomElement, counterMap: Map<string, number>): (ReactElement | undefined) => {
  const gistId = testSingleVideoParagraph(node, 'gist')
  if (gistId) {
    const count = (counterMap.get(gistId) || 0) + 1
    counterMap.set(gistId, count)
    return (
      <OneClickEmbedding loadingImageUrl={preview} hoverIcon={'github'}>
        <GistFrame key={`gist_${gistId}_${count}`} id={gistId}/>
      </OneClickEmbedding>
    )
  }
}

export { getElementReplacement as getGistReplacement }
