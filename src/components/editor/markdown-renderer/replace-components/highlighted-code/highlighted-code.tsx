import { DomElement } from 'domhandler'
import React, { ReactElement } from 'react'
import Highlight from 'react-highlight.js'
import './highlighted-code.scss'

const getElementReplacement = (preNode: DomElement, counterMap: Map<string, number>): (ReactElement | undefined) => {
  if (preNode.name !== 'pre' || !preNode.children || preNode.children.length !== 1) {
    return
  }
  const codeNode = preNode.children[0]
  if (codeNode.name !== 'code' || !codeNode.attribs || !codeNode.attribs['data-highlight-language'] || codeNode.attribs['data-highlight-language'] === '' || !codeNode.children || !codeNode.children[0]) {
    return
  }

  const language = codeNode.attribs['data-highlight-language']
  const count = (counterMap.get(language) || 0) + 1
  counterMap.set(language, count)

  return <Highlight language={language} key={`highlighted_code_${language}_${count}`}>
    {
      codeNode.children[0].data
    }
  </Highlight>
}

export { getElementReplacement as getHighlightedCodeBlock }
