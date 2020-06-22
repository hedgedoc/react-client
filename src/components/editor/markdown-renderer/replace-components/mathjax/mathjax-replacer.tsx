import React from 'react'
import { ComponentReplacer } from '../../markdown-renderer'
import { getAttributesFromCodiMdTag } from '../codi-md-tag-utils'
import MathJax from 'react-mathjax'

const getElementReplacement: ComponentReplacer = (node, index: number, counterMap) => {
  const attributes = getAttributesFromCodiMdTag(node, 'mathjax')
  if (attributes && attributes.content) {
    const mathJaxContent = attributes.content
    const count = (counterMap.get('mathjax') || 0) + 1
    counterMap.set('mathjax', count)
    return <MathJaxReplacer key={`mathjax-${index}`} inline={!!attributes.inline} formula={mathJaxContent}/>
  }
}

export interface MathJaxProps {
  inline?: boolean
  formula: string
}

export const MathJaxReplacer: React.FC<MathJaxProps> = ({ inline = false, formula }) => {
  return (
    <MathJax.Node inline={inline} formula={formula}/>
  )
}

export { getElementReplacement as getMathJaxReplacement }
