import MarkdownIt from 'markdown-it'
import React, { ReactElement, RefObject, useMemo, useRef } from 'react'
import { Alert } from 'react-bootstrap'
import ReactHtmlParser from 'react-html-parser'
import { Trans } from 'react-i18next'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../../redux'
import { ShowIf } from '../common/show-if/show-if'
import './markdown-renderer.scss'
import { ComponentReplacer } from './replace-components/ComponentReplacer'
import { buildTransformer } from './utils/html-react-transformer'
import { calculateNewLineNumberMapping } from './utils/line-number-mapping'
import { LineKeys } from './utils/types'

export interface LineMarkerPosition {
  line: number
  position: number
}

export interface AdditionalMarkdownRendererProps {
  className?: string,
  content: string,
  wide?: boolean,
}

export interface BasicMarkdownRendererProps {
  componentReplacers: ComponentReplacer[],
  onConfigureMarkdownIt: (md: MarkdownIt) => void,
  documentReference?: RefObject<HTMLDivElement>
  onBeforeRendering?: () => void
}

export const BasicMarkdownRenderer: React.FC<BasicMarkdownRendererProps & AdditionalMarkdownRendererProps> = ({
  className,
  content,
  wide,
  componentReplacers,
  onConfigureMarkdownIt,
  documentReference,
  onBeforeRendering
}) => {
  const maxLength = useSelector((state: ApplicationState) => state.config.maxDocumentLength)

  const markdownIt = useMemo(() => {
    const md = new MarkdownIt('default', {
      html: true,
      breaks: true,
      langPrefix: '',
      typographer: true
    })

    onConfigureMarkdownIt(md)

    return md
  }, [onConfigureMarkdownIt])

  const oldMarkdownLineKeys = useRef<LineKeys[]>()
  const lastUsedLineId = useRef<number>(0)

  const markdownReactDom: ReactElement[] = useMemo(() => {
    if (onBeforeRendering) {
      onBeforeRendering()
    }
    const trimmedContent = content.substr(0, maxLength)
    const html: string = markdownIt.render(trimmedContent)
    const contentLines = trimmedContent.split('\n')
    const { lines: newLines, lastUsedLineId: newLastUsedLineId } = calculateNewLineNumberMapping(contentLines, oldMarkdownLineKeys.current ?? [], lastUsedLineId.current)
    oldMarkdownLineKeys.current = newLines
    lastUsedLineId.current = newLastUsedLineId
    return ReactHtmlParser(html, { transform: buildTransformer(newLines, componentReplacers) })
  }, [onBeforeRendering, content, maxLength, markdownIt, componentReplacers])

  return (
    <div className={`${className || ''} d-flex flex-column align-items-center ${wide ? 'wider' : ''}`}>
      <ShowIf condition={content.length > maxLength}>
        <Alert variant='danger' dir={'auto'}>
          <Trans i18nKey={'editor.error.limitReached.description'} values={{ maxLength }}/>
        </Alert>
      </ShowIf>
      <div className={'mb-5'}/>
      <div ref={documentReference} className={'markdown-body w-100 d-flex flex-column align-items-center'}>
        {markdownReactDom}
      </div>
    </div>
  )
}
