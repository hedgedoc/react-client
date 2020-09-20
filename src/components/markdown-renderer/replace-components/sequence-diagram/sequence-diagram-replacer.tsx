import { DomElement } from 'domhandler'
import React, { Fragment } from 'react'
import { ComponentReplacer } from '../ComponentReplacer'

const MermaidChart = React.lazy(() => import('../mermaid/mermaid-chart'))
const DeprecationWarning = React.lazy(() => import('./deprecation-warning'))

export class SequenceDiagramReplacer implements ComponentReplacer {
  getReplacement (codeNode: DomElement): React.ReactElement | undefined {
    if (codeNode.name !== 'code' || !codeNode.attribs || !codeNode.attribs['data-highlight-language'] || codeNode.attribs['data-highlight-language'] !== 'sequence' || !codeNode.children || !codeNode.children[0]) {
      return
    }

    const code = codeNode.children[0].data as string

    return <Fragment>
      <DeprecationWarning/>
      <MermaidChart code={'sequenceDiagram\n' + code}/>
    </Fragment>
  }
}
