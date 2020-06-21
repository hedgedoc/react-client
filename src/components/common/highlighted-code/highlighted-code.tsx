import hljs from 'highlight.js'
import React, { useMemo } from 'react'
import ReactHtmlParser from 'react-html-parser'
import { ShowIf } from '../show-if/show-if'
import './highlighted-code.scss'

export interface HighlightedCodeProps {
  code: string,
  language?: string,
  showGutter: boolean
}

export const escapeHtml = (unsafe: string): string => {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export const HighlightedCode: React.FC<HighlightedCodeProps> = ({ code, language, showGutter }) => {
  const highlightedCode = useMemo(() => {
    const replacedLanguage = language === 'html' ? 'xml' : language
    return (!!replacedLanguage && hljs.listLanguages().indexOf(replacedLanguage) > -1) ? hljs.highlight(replacedLanguage, code).value : escapeHtml(code)
      .split('\n')
      .filter(line => !!line)
      .map(line => ReactHtmlParser(line))
  }, [code, language])

  return (
    <code className={'hljs'}>
      <ShowIf condition={showGutter}>
        <span className={'linenumbers'}>
          {
            highlightedCode
              .map((line, index) => {
                return <span data-line-number={index + 1}/>
              })
          }
        </span>
      </ShowIf>
      <span className={'code'}>
        {
          highlightedCode
            .map((line, index) =>
              <div key={index} className={'line'}>
                {line}
              </div>)
        }
      </span>
    </code>)
}
