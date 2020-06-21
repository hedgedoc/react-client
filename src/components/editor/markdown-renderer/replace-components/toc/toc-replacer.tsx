import { DomElement } from 'domhandler'
import React, { ReactElement, Fragment } from 'react'
import { SubNodeConverter } from '../../markdown-renderer'

const getElementReplacement = (node: DomElement, counterMap: Map<string, number>, nodeConverter: SubNodeConverter): (ReactElement | undefined) => {
  if (node.name === 'p' && node.children && node.children.length === 1) {
    const possibleTocDiv = node.children[0]
    if (possibleTocDiv.name === 'div' && possibleTocDiv.attribs && possibleTocDiv.attribs.class && possibleTocDiv.attribs.class === 'table-of-contents') {
      const reactElement = nodeConverter(possibleTocDiv, 0)
      return (
        <Fragment>
          { reactElement }
        </Fragment>
      )
    }
  }
}

export { getElementReplacement as getTOCReplacement }
