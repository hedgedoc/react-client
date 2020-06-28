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
      <ShowIf condition={toc.l > 0}>
        <a href={'#'}>{toc.n.trim()}</a>
      </ShowIf>
      <ShowIf condition={toc.c.length > 0}>
        <ul>
          {toc.c.map(child => {
            return <li>{convertLevel(child)}</li>
          })}
        </ul>
      </ShowIf>
    </Fragment>
  )
}

export const MarkdownToc: React.FC<MarkdownTocProps> = ({ ast, maxDepth = 3, sticky }) => {
  return (
    <div className={`markdown-toc ${sticky ? 'sticky' : ''}`}>
      {convertLevel(ast)}
    </div>
  )
}
