import { DomElement } from 'domhandler'

export const testSingleVideoParagraph = (node: DomElement, regex: RegExp): (string | undefined) => {
  if (!node.name || node.name !== 'p') {
    return
  }
  if (!node.children || node.children.length !== 1) {
    return
  }
  const childTag = node.children[0]
  if (childTag.name !== 'a') {
    return
  }
  if (!childTag.attribs || !childTag.attribs.href) {
    return
  }
  if (!regex.test(childTag.attribs.href)) {
    return
  }
  if (!childTag.children || !childTag.children[0] || childTag.children[0].type !== 'text') {
    return
  }
  if (!childTag.children[0].data || childTag.children[0].data !== childTag.attribs.href) {
    return
  }
  const matches = regex.exec(childTag.attribs.href)
  if (!matches) {
    return
  }
  return matches[1]
}

export interface VideoFrameProps {
  id: string
}
