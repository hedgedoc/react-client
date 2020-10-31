import React, { ReactElement, RefObject, useEffect, useRef, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { Trans } from 'react-i18next'
import { useSelector } from 'react-redux'
import { TocAst } from '../../external-types/markdown-it-toc-done-right/interface'
import { ApplicationState } from '../../redux'
import { RenderMarkdownInput, RenderMarkdownOutput } from '../../worker/markdown'
import { ShowIf } from '../common/show-if/show-if'
import { RawYAMLMetadata } from '../editor/yaml-metadata/yaml-metadata'
import './markdown-renderer.scss'
import { LineMarkers } from './replace-components/linemarker/line-number-marker'
import { AdditionalMarkdownRendererProps, LineKeys } from './types'

export interface BasicMarkdownRendererProps {
  markdownItType: RenderMarkdownInput['markdownItType']
  useFrontmatter?: boolean
  onYamlError?: (error: boolean) => void
  onRawMeta?: (rawMeta: RawYAMLMetadata) => void
  onToc?: (toc: TocAst) => void
  onLineMarkers?: (lineMarkers: LineMarkers[]) => void
  onTaskCheckedChange?: (lineInMarkdown: number, checked: boolean) => void
  documentReference?: RefObject<HTMLDivElement>
  onBeforeRendering?: () => void
}

export const BasicMarkdownRenderer: React.FC<BasicMarkdownRendererProps & AdditionalMarkdownRendererProps> = ({
  className,
  content,
  wide,
  markdownItType,
  useFrontmatter,
  onYamlError,
  onRawMeta,
  onToc,
  onLineMarkers, onTaskCheckedChange,
  documentReference,
  onBeforeRendering
}) => {
  const maxLength = useSelector((state: ApplicationState) => state.config.maxDocumentLength)

  const [markdownReactDom, setMarkdownReactDom] = useState<ReactElement[]>([])
  const oldMarkdownLineKeys = useRef<LineKeys[]>([])
  const lastUsedLineId = useRef<number>(0)
  const markdownWorker = useRef<Worker>()

  useEffect(() => {
    markdownWorker.current = new Worker('../../worker/markdown.ts', { name: 'markdownRenderer', type: 'module' })
    markdownWorker.current.onmessage = event => {
      const data = event.data as RenderMarkdownOutput
      console.log('output', data)
      oldMarkdownLineKeys.current = data.newLines
      lastUsedLineId.current = data.newLastUsedLineId
      setMarkdownReactDom(data.markdownReactDom)
      if (onYamlError && data.yamlError) {
        onYamlError(data.yamlError)
      }
      if (onRawMeta && data.rawMeta) {
        onRawMeta(data.rawMeta)
      }
      if (onToc && data.toc) {
        onToc(data.toc)
      }
      if (onLineMarkers && data.lineMarkers) {
        onLineMarkers(data.lineMarkers)
      }
      if (onTaskCheckedChange && data.tasksChecked.length > 0) {
        data.tasksChecked.forEach(({ lineInMarkdown, checked }) => {
          onTaskCheckedChange(lineInMarkdown, checked)
        })
      }
    }
  }, [onLineMarkers, onRawMeta, onTaskCheckedChange, onToc, onYamlError])

  useEffect(() => {
    if (onBeforeRendering) {
      onBeforeRendering()
    }
    if (markdownWorker.current) {
      const input: RenderMarkdownInput = {
        content: content,
        maxLength: maxLength,
        markdownItType: markdownItType,
        oldMarkdownLineKeys: oldMarkdownLineKeys.current,
        lastUsedLineId: lastUsedLineId.current,
        useFrontmatter: useFrontmatter ?? false
      }
      markdownWorker.current.postMessage(input)
    }
  }, [content, markdownItType, maxLength, onBeforeRendering, useFrontmatter])

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
