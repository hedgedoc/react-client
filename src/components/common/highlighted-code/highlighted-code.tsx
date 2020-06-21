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

export const HighlightedCode: React.FC<HighlightedCodeProps> = ({ code, language, showGutter }) => {
  const highlightedCode = useMemo(() =>
    ((language) ? hljs.highlight(language, code).value : code)
      .split('\n')
      .filter(line => !!line)
      .map(line => ReactHtmlParser(line)), [code, language])

  return (
    <code className={'hljs'}>
      <ShowIf condition={showGutter}>
        <span className={'linenumbers'}>
          {
            highlightedCode
              .map((line, index) => {
                return <span data-line-number={index}/>
              })
          }
        </span>
      </ShowIf>
      <span className={'code'}>
        {
          highlightedCode
            .map((line, index) => {
              const m = Math.log10(highlightedCode.length)
              const lineNumber = index + 1
              return <div key={index} className={'line'}>
                {line}
              </div>
            })
        }
      </span>

    </code>)
}
