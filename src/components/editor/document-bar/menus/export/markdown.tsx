import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { download } from '../../../../common/download/download'
import { ForkAwesomeIcon } from '../../../../common/fork-awesome/fork-awesome-icon'

export interface MarkdownExportProps {
  title: string
  noteContent: string
}

export const MarkdownExport: React.FC<MarkdownExportProps> = ({ title, noteContent }) => {
  return (
    <Dropdown.Item className='small' onClick={() => download(noteContent, `${title}.md`, 'text/markdown')}>
      <ForkAwesomeIcon icon='file-text' className={'mx-2'}/>
      Markdown
    </Dropdown.Item>
  )
}
