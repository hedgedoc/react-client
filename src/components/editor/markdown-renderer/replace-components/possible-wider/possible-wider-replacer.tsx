import { DomElement } from 'domhandler'
import React from 'react'
import { ComponentReplacer, SubNodeConverter } from '../ComponentReplacer'

export class PossibleWiderReplacer implements ComponentReplacer {
  getReplacement (node: DomElement, index: number, subNodeConverter: SubNodeConverter): React.ReactElement | undefined {
    if (node.name === 'p' && node.children && node.children.length === 1 && node.children[0].name === 'img') {
      // single image in <p>
      return (<p className='wider-possible'>
        {subNodeConverter(node, index)}
      </p>)
    }
  }
}
