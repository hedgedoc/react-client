import React, { ReactElement, RefObject, useEffect, useRef, useState } from 'react'
import { Alert } from 'react-bootstrap'
import ReactHtmlParser from 'react-html-parser'
import { Trans } from 'react-i18next'
import { useSelector } from 'react-redux'
// eslint-disable-next-line
import createWorker, { Workerized } from 'workerize-loader!../../worker/markdown.worker'
import { TocAst } from '../../external-types/markdown-it-toc-done-right/interface'
import { ApplicationState, store } from '../../redux'
import * as MarkdownWorker from '../../worker/markdown.worker'
import { RenderMarkdownInput } from '../../worker/markdown.worker'
import { ShowIf } from '../common/show-if/show-if'
import { RawYAMLMetadata } from '../editor/yaml-metadata/yaml-metadata'
import './markdown-renderer.scss'
import { LineMarkers } from './replace-components/linemarker/line-number-marker'
import { AdditionalMarkdownRendererProps, LineKeys } from './types'
import { createReplacerInstanceList } from './utils/create-replacer-instance-list'
import { buildTransformer } from './utils/html-react-transformer'

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
  const worker = useRef<Workerized<typeof MarkdownWorker>>()

  useEffect(() => {
    worker.current = createWorker<typeof MarkdownWorker>()
  })

  useEffect(() => {
    if (onBeforeRendering) {
      onBeforeRendering()
    }
    const rendererWorker = worker.current
    if (rendererWorker) {
      const plantumlServer = store.getState().config.plantumlServer
      const input: RenderMarkdownInput = {
        content: content,
        maxLength: maxLength,
        markdownItType: markdownItType,
        oldMarkdownLineKeys: oldMarkdownLineKeys.current,
        lastUsedLineId: lastUsedLineId.current,
        useFrontmatter: useFrontmatter ?? false,
        plantumlServer: plantumlServer
      }
      rendererWorker.render(input)
        .then(data => {
          console.log(data.debugOutput)
          console.log('render output', data)
          const transformer = onTaskCheckedChange ? buildTransformer(data.newLines, createReplacerInstanceList(onTaskCheckedChange)) : undefined
          setMarkdownReactDom(ReactHtmlParser(data.htmlOutput, { transform: transformer }))
          oldMarkdownLineKeys.current = data.newLines
          lastUsedLineId.current = data.newLastUsedLineId
          if (onYamlError && data.yamlError) {
            onYamlError(data.yamlError)
          }
          if (onRawMeta && data.rawMeta) {
            console.log('call on RawMeta')
            onRawMeta(data.rawMeta)
          }
          if (onToc && data.toc) {
            onToc(data.toc)
          }
          if (onLineMarkers && data.lineMarkers) {
            onLineMarkers(data.lineMarkers)
          }
        })
        .catch(err => console.error(err))
    }
  }, [content, markdownItType, maxLength, onBeforeRendering, onLineMarkers, onRawMeta, onTaskCheckedChange, onToc, onYamlError, useFrontmatter])

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
