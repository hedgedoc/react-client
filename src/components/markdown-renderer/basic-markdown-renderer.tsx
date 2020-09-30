import MarkdownIt from 'markdown-it'
import React, { ReactElement, RefObject, useEffect, useRef, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { Trans } from 'react-i18next'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../../redux'
import { RenderMarkdownInput, RenderMarkdownOutput } from '../../worker/markdown'
import { ShowIf } from '../common/show-if/show-if'
import './markdown-renderer.scss'
import { ComponentReplacer } from './replace-components/ComponentReplacer'
import { AdditionalMarkdownRendererProps, LineKeys } from './types'

export interface BasicMarkdownRendererProps {
  componentReplacers?: () => ComponentReplacer[],
  markdownIt: MarkdownIt,
  documentReference?: RefObject<HTMLDivElement>
  onBeforeRendering?: () => void
}

export const BasicMarkdownRenderer: React.FC<BasicMarkdownRendererProps & AdditionalMarkdownRendererProps> = ({
  className,
  content,
  wide,
  componentReplacers,
  markdownIt,
  documentReference,
  onBeforeRendering
}) => {
  const maxLength = useSelector((state: ApplicationState) => state.config.maxDocumentLength)

  const [markdownReactDom, setMarkdownReactDom] = useState<ReactElement[]>([])
  const oldMarkdownLineKeys = useRef<LineKeys[]>([])
  const lastUsedLineId = useRef<number>(0)
  const markdownWorker = useRef<Worker>()

  useEffect(() => {
    markdownWorker.current = new Worker('../../worker/markdown.ts', { type: 'module' })
    markdownWorker.current.onmessage = event => {
      const data = event.data as RenderMarkdownOutput
      oldMarkdownLineKeys.current = data.newLines
      lastUsedLineId.current = data.newLastUsedLineId
      setMarkdownReactDom(data.markdownReactDom)
    }
  }, [])

  useEffect(() => {
    if (onBeforeRendering) {
      onBeforeRendering()
    }
    const trimmedContent = content.substr(0, maxLength)
    const html: string = markdownIt.render(trimmedContent)
    const contentLines = trimmedContent.split('\n')
    const { lines: newLines, lastUsedLineId: newLastUsedLineId } = calculateNewLineNumberMapping(contentLines, oldMarkdownLineKeys.current ?? [], lastUsedLineId.current)
    oldMarkdownLineKeys.current = newLines
    lastUsedLineId.current = newLastUsedLineId
    const transformer = componentReplacers ? buildTransformer(newLines, componentReplacers()) : undefined
    return ReactHtmlParser(html, { transform: transformer })
  }, [onBeforeRendering, content, maxLength, markdownIt, componentReplacers])
    if (markdownWorker.current) {
      const input: RenderMarkdownInput = {
        content: content,
        maxLength: maxLength,
        markdownIt: markdownIt,
        oldMarkdownLineKeys: oldMarkdownLineKeys.current,
        lastUsedLineId: lastUsedLineId.current,
        componentReplacers: componentReplacers ? componentReplacers() : undefined
      }
      markdownWorker.current.postMessage(input)
    }
  }, [componentReplacers, content, markdownIt, maxLength, onBeforeRendering])

  return (
    <div className={`${className || ''} d-flex flex-column align-items-center ${wide ? 'wider' : ''}`}>
      <ShowIf condition={content.length > maxLength}>
        <Alert variant='danger' dir={'auto'}>
          <Trans i18nKey={'editor.error.limitReached.description'} values={{ maxLength }}/>
        </Alert>
      </ShowIf>
      <div ref={documentReference} className={'markdown-body w-100 d-flex flex-column align-items-center'}>
        {markdownReactDom}
      </div>
    </div>
  )
}
