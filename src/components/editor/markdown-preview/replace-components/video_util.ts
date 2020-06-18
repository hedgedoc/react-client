import { DomElement } from 'domhandler'

export const testSingleVideoParagraph = (node: DomElement, tagName: string): (string | undefined) => {
  if (!node.name || node.name !== 'p') {
    return
  }
  if (!node.children || node.children.length !== 1) {
    return
  }
  const childTag = node.children[0]
  if (childTag.name !== 'a' || !childTag.children || childTag.children.length !== 1) {
    return
  }
  const videoTag = childTag.children[0]
  if (videoTag.name !== `codimd-${tagName}` || !videoTag.attribs || !videoTag.attribs.id) {
    return
  }
  return videoTag.attribs.id
}

export interface VideoFrameProps {
  id: string
}
