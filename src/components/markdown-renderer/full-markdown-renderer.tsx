import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { Trans } from 'react-i18next'
import { TocAst } from '../../external-types/markdown-it-toc-done-right/interface'
import { InternalLink } from '../common/links/internal-link'
import { ShowIf } from '../common/show-if/show-if'
import { RawYAMLMetadata, YAMLMetaData } from '../editor/yaml-metadata/yaml-metadata'
import { BasicMarkdownRenderer } from './basic-markdown-renderer'
import { FullMarkdownItConfigurator } from './markdown-it-configurator/FullMarkdownItConfigurator'
import { LineMarkers } from './replace-components/linemarker/line-number-marker'
import { AbcReplacer } from './replace-components/abc/abc-replacer'
import { AsciinemaReplacer } from './replace-components/asciinema/asciinema-replacer'
import { CsvReplacer } from './replace-components/csv/csv-replacer'
import { FlowchartReplacer } from './replace-components/flow/flowchart-replacer'
import { GistReplacer } from './replace-components/gist/gist-replacer'
import { GraphvizReplacer } from './replace-components/graphviz/graphviz-replacer'
import { HighlightedCodeReplacer } from './replace-components/highlighted-fence/highlighted-fence-replacer'
import { ImageReplacer } from './replace-components/image/image-replacer'
import { KatexReplacer } from './replace-components/katex/katex-replacer'
import { LinemarkerReplacer } from './replace-components/linemarker/linemarker-replacer'
import { MarkmapReplacer } from './replace-components/markmap/markmap-replacer'
import { MermaidReplacer } from './replace-components/mermaid/mermaid-replacer'
import { PdfReplacer } from './replace-components/pdf/pdf-replacer'
import { PossibleWiderReplacer } from './replace-components/possible-wider/possible-wider-replacer'
import { QuoteOptionsReplacer } from './replace-components/quote-options/quote-options-replacer'
import { SequenceDiagramReplacer } from './replace-components/sequence-diagram/sequence-diagram-replacer'
import { TaskListReplacer } from './replace-components/task-list/task-list-replacer'
import { VegaReplacer } from './replace-components/vega-lite/vega-replacer'
import { VimeoReplacer } from './replace-components/vimeo/vimeo-replacer'
import { YoutubeReplacer } from './replace-components/youtube/youtube-replacer'
import { AdditionalMarkdownRendererProps, LineMarkerPosition } from './types'
import { useCalculateLineMarkerPosition } from './utils/calculate-line-marker-positions'
import { usePostMetaDataOnChange } from './utils/use-post-meta-data-on-change'
import { usePostTocAstOnChange } from './utils/use-post-toc-ast-on-change'

export interface FullMarkdownRendererProps {
  onFirstHeadingChange?: (firstHeading: string | undefined) => void
  onLineMarkerPositionChanged?: (lineMarkerPosition: LineMarkerPosition[]) => void
  onMetaDataChange?: (yamlMetaData: YAMLMetaData | undefined) => void
  onTaskCheckedChange: (lineInMarkdown: number, checked: boolean) => void
  onTocChange?: (ast: TocAst) => void
}

export const FullMarkdownRenderer: React.FC<FullMarkdownRendererProps & AdditionalMarkdownRendererProps> = ({
  onFirstHeadingChange,
  onLineMarkerPositionChanged,
  onMetaDataChange,
  onTaskCheckedChange,
  onTocChange,
  content,
  className,
  wide
}) => {
  const allReplacers = useMemo(() => {
    return [
      new LinemarkerReplacer(),
      new PossibleWiderReplacer(),
      new GistReplacer(),
      new YoutubeReplacer(),
      new VimeoReplacer(),
      new AsciinemaReplacer(),
      new AbcReplacer(),
      new PdfReplacer(),
      new ImageReplacer(),
      new SequenceDiagramReplacer(),
      new CsvReplacer(),
      new FlowchartReplacer(),
      new MermaidReplacer(),
      new GraphvizReplacer(),
      new MarkmapReplacer(),
      new VegaReplacer(),
      new HighlightedCodeReplacer(),
      new QuoteOptionsReplacer(),
      new KatexReplacer(),
      new TaskListReplacer(onTaskCheckedChange)
    ]
  }, [onTaskCheckedChange])

  const [yamlError, setYamlError] = useState(false)

  const rawMetaRef = useRef<RawYAMLMetadata>()
  const firstHeadingRef = useRef<string>()
  const documentElement = useRef<HTMLDivElement>(null)
  const currentLineMarkers = useRef<LineMarkers[]>()
  usePostMetaDataOnChange(rawMetaRef.current, firstHeadingRef.current, onMetaDataChange, onFirstHeadingChange)
  useCalculateLineMarkerPosition(documentElement, currentLineMarkers.current, onLineMarkerPositionChanged, documentElement.current?.offsetTop ?? 0)

  const tocAst = useRef<TocAst>()
  usePostTocAstOnChange(tocAst, onTocChange)

  const extractInnerText = useCallback((node: ChildNode): string => {
    let innerText = ''
    if (node.childNodes && node.childNodes.length > 0) {
      node.childNodes.forEach((child) => { innerText += extractInnerText(child) })
    } else if (node.nodeName === 'IMG') {
      innerText += (node as HTMLImageElement).getAttribute('alt')
    } else {
      innerText += node.textContent
    }
    return innerText
  }, [])

  useEffect(() => {
    if (onFirstHeadingChange && documentElement.current) {
      const firstHeading = documentElement.current.getElementsByTagName('h1').item(0)
      if (firstHeading) {
        onFirstHeadingChange(extractInnerText(firstHeading))
      }
    }
  }, [content, extractInnerText, onFirstHeadingChange])

  const markdownIt = useMemo(() => {
    return (new FullMarkdownItConfigurator(
      !!onMetaDataChange,
      error => setYamlError(error),
      rawMeta => { rawMetaRef.current = rawMeta },
      toc => { tocAst.current = toc },
      lineMarkers => { currentLineMarkers.current = lineMarkers }
    )).buildConfiguredMarkdownIt()
  }, [onMetaDataChange])

  const clearMetadata = useCallback(() => {
    rawMetaRef.current = undefined
  }, [])

  return (
    <div className={'position-relative'}>
      <ShowIf condition={yamlError}>
        <Alert variant='warning' dir='auto'>
          <Trans i18nKey='editor.invalidYaml'>
            <InternalLink text='yaml-metadata' href='/n/yaml-metadata' className='text-dark'/>
          </Trans>
        </Alert>
      </ShowIf>
      <BasicMarkdownRenderer className={className} wide={wide} content={content} componentReplacers={allReplacers}
        markdownIt={markdownIt} documentReference={documentElement}
        onBeforeRendering={clearMetadata}/>
    </div>
  )
}
