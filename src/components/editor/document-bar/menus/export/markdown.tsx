import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { ForkAwesomeIcon } from '../../../../common/fork-awesome/fork-awesome-icon'

export interface MarkdownExportProps {
  title: string
  noteContent: string
}

export const MarkdownExport: React.FC<MarkdownExportProps> = ({ title, noteContent }) => {
  const downloadMarkdown = () => {
    const element = document.createElement('a')
    const file = new Blob([noteContent], { type: 'text/markdown' })
    element.href = URL.createObjectURL(file)
    element.download = `${title}.md`
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
  }

  return (
    <Dropdown.Item className='small' onClick={() => downloadMarkdown()}>
      <ForkAwesomeIcon icon='file-text' className={'mx-2'}/>
      Markdown
    </Dropdown.Item>
  )
}
