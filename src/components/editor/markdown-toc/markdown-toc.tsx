import React, { Fragment, ReactElement } from 'react'
import { TocAst } from '../../../external-types/markdown-it-toc-done-right/interface'
import { ShowIf } from '../../common/show-if/show-if'
import './markdown-toc.scss'

export interface MarkdownTocProps {
  ast: TocAst
  maxDepth?: number
  sticky?: boolean
}

const convertLevel = (toc: TocAst): ReactElement => {
  return (
    <Fragment>
      {toc.n}
      <ShowIf condition={toc.c.length > 0}>
        <ul>
          {toc.c.map(convertLevel)}
        </ul>
      </ShowIf>
    </Fragment>
  )
}

export const MarkdownToc: React.FC<MarkdownTocProps> = ({ ast, maxDepth = 3, sticky,}) => {
  return (
    <div className={`markdown-toc ${sticky ? 'sticky' : ''}`}>
      {convertLevel(ast)}
    </div>
  )
}
