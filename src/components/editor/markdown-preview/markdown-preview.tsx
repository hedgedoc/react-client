import MarkdownIt from 'markdown-it'
import taskList from 'markdown-it-task-lists'
import React, { ReactElement, useMemo } from 'react'
import ReactHtmlParser from 'react-html-parser'
import './markdown-preview.scss'

export interface MarkdownPreviewProps {
  content: string
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ content }) => {
  const markdownIt = useMemo(() => {
    const md = new MarkdownIt()
    md.use(taskList)
    return md
  }, [])
  const result: ReactElement[] = useMemo(() => {
    const html: string = markdownIt.render(content)
    const ret: ReactElement[] = ReactHtmlParser(html)
    return ret
  }, [content, markdownIt])

  console.log(result)

  return (
    <div className={'bg-light container-fluid flex-fill overflow-y-scroll'}>
      <div className={'markdown-body container-fluid'}>{result}</div>
    </div>
  )
}

export { MarkdownPreview }
