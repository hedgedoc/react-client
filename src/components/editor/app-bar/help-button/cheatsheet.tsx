import React from 'react'
import { Table } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { MarkdownRenderer } from '../../../markdown-renderer/markdown-renderer'
import { HighlightedCode } from '../../../markdown-renderer/replace-components/highlighted-fence/highlighted-code/highlighted-code'
import './cheatsheet.scss'

export const Cheatsheet: React.FC = () => {
  const { t } = useTranslation()
  const codes = [
    `**${t('editor.editorToolbar.bold')}**`,
    `*${t('editor.editorToolbar.italic')}*`,
    `++${t('editor.editorToolbar.underline')}++`,
    `~~${t('editor.editorToolbar.strikethrough')}~~`,
    'H~2~O',
    '19^th^',
    `==${t('editor.help.cheatsheet.highlightedText')}==`,
    `# ${t('editor.editorToolbar.header')}`,
    `\`${t('editor.editorToolbar.code')}\``,
    '```javascript=\nvar x = 5;\n```',
    `> ${t('editor.editorToolbar.blockquote')}`,
    `- ${t('editor.editorToolbar.unorderedList')}`,
    `1. ${t('editor.editorToolbar.orderedList')}`,
    `- [ ] ${t('editor.editorToolbar.checkList')}`,
    `[${t('editor.editorToolbar.link')}](https://example.com)`,
    `![${t('editor.editorToolbar.image')}](/icons/mstile-70x70.png)`,
    ':smile:',
    `:::info\n${t('editor.help.cheatsheet.exampleAlert')}\n:::`
  ]
  return (
    <Table className="table-condensed table-cheatsheet">
      <thead>
        <tr>
          <td className={'font-weight-bold'}><Trans i18nKey='editor.help.cheatsheet.example'/></td>
          <td className={'font-weight-bold'}><Trans i18nKey='editor.help.cheatsheet.syntax'/></td>
        </tr>
      </thead>
      <tbody className="markdown-body"
        style={{ fontFamily: 'inherit', fontSize: '14px', padding: 0, maxWidth: 'inherit' }}>
        {codes.map((code, i) => {
          return (
            <tr key={i}>
              <td>
                <MarkdownRenderer
                  content={code}
                  wide={false}
                  onTocChange={() => false}
                  onMetaDataChange={() => false}
                  onFirstHeadingChange={() => false}
                  onLineMarkerPositionChanged={() => false}
                />
              </td>
              <td>
                <HighlightedCode code={code} wrapLines={true} startLineNumber={1} language={'markdown'}/>
              </td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}
