import { Editor } from 'codemirror'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ShowIf } from '../../../common/show-if/show-if'
import './status-bar.scss'

export interface StatusBarProps {
  editor?: Editor
}

export const StatusBar: React.FC<StatusBarProps> = ({ editor }) => {
  const { t } = useTranslation()
  const position = editor?.getCursor() ?? { line: 0, ch: 0 }
  const selection = editor?.getSelection() ?? ''
  const selectionIsNotEmpty = selection !== ''
  const selectedColumns = selectionIsNotEmpty ? selection.length : 0
  const selectedLines = selectionIsNotEmpty ? selection.split('\n').length : 0
  const linesInDocument = editor?.lineCount()
  const charactersInDocument = editor?.getValue().length
  return (
    <div className="d-flex flex-row status-bar">
      <div>
        <span>{t('editor.statusBar.cursor', { line: position.line, columns: position.ch })}</span>
        <ShowIf condition={selectionIsNotEmpty}>
          <ShowIf condition={selectedLines === 1}>
            <span>&nbsp;–&nbsp;{t('editor.statusBar.selection.column', { count: selectedColumns })}</span>
          </ShowIf>
          <ShowIf condition={selectedLines > 1}>
            <span>&nbsp;–&nbsp;{t('editor.statusBar.selection.line', { count: selectedLines })}</span>
          </ShowIf>
        </ShowIf>
      </div>
      <div className="ml-auto">
        <span>{t('editor.statusBar.lines', { lines: linesInDocument })}</span>
        <span className={'pr-2'} title={t('editor.statusBar.lengthToolbar')}>&nbsp;–&nbsp;{t('editor.statusBar.length', { length: charactersInDocument })}</span>
      </div>
    </div>
  )
}
