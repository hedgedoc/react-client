import { DomElement } from 'domhandler'
import React from 'react'
import { getAttributesFromCodiMdTag } from '../codi-md-tag-utils'
import { ComponentReplacer } from '../ComponentReplacer'
import { OneClickEmbedding } from '../one-click-frame/one-click-embedding'
import { TweetFrame } from './tweet-frame'
import preview from './gist-preview.png'

export class TweetReplacer implements ComponentReplacer {
  private counterMap: Map<string, number> = new Map<string, number>()

  getReplacement (node: DomElement): React.ReactElement | undefined {
    const attributes = getAttributesFromCodiMdTag(node, 'tweet')
    if (attributes && attributes.id) {
      const tweetId = attributes.id
      const count = (this.counterMap.get(tweetId) || 0) + 1
      this.counterMap.set(tweetId, count)
      return (
        <OneClickEmbedding previewContainerClassName={'tweet-frame'} key={`tweet_${tweetId}_${count}`} loadingImageUrl={preview} hoverIcon={'twitter'} tooltip={'click to load tweet'}>
          <TweetFrame id={tweetId}/>
        </OneClickEmbedding>
      )
    }
  }
}
