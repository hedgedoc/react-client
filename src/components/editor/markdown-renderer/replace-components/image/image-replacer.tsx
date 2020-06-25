import { DomElement } from 'domhandler'
import React from 'react'
import { ComponentReplacer } from '../ComponentReplacer'
import { ImageFrame } from './image-frame'

export class ImageReplacer implements ComponentReplacer {
  getReplacement (node: DomElement): React.ReactElement | undefined {
    if (node.name !== 'p') {
      return
    }
    if (!node.children || node.children.length !== 1) {
      return
    }
    if (node.children[0].name === 'img' &&
      node.children[0].attribs &&
      node.children[0].attribs.src) {
      // single image in <p>
      return <ImageFrame
        id={node.children[0].attribs.id}
        className={node.children[0].attribs.class}
        src={node.children[0].attribs.src}
        alt={node.children[0].attribs.alt}/>
    }
  }
}
