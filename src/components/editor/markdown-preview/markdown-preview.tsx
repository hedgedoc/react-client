import MarkdownIt from 'markdown-it'
import React, { ReactElement, useMemo } from 'react'

import ReactHtmlParser from 'react-html-parser'
import './markdown-preview.scss'

export interface MarkdownPreviewProps {
  content: string
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ content }) => {
  const markdownIt = useMemo(() => new MarkdownIt(), [])
  const result:ReactElement[] = useMemo(() => {
    const html:string = markdownIt.render(content)
    const ret:ReactElement[] = ReactHtmlParser(html)
    return ret
  }, [content, markdownIt])

  console.log(result)

  return (
    <div className={'bg-light markdown-body'}>{result}</div>
  )
}

export { MarkdownPreview }
