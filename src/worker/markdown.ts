import { ReactElement } from 'react'
import ReactHtmlParser from 'react-html-parser'
import { RawYAMLMetadata } from '../components/editor/yaml-metadata/yaml-metadata'
import { useReplacerInstanceListCreator } from '../components/markdown-renderer/hooks/use-replacer-instance-list-creator'
import { BasicMarkdownItConfigurator } from '../components/markdown-renderer/markdown-it-configurator/BasicMarkdownItConfigurator'
import { FullMarkdownItConfigurator } from '../components/markdown-renderer/markdown-it-configurator/FullMarkdownItConfigurator'
import { alertContainer } from '../components/markdown-renderer/markdown-it-plugins/alert-container'
import { LineMarkers } from '../components/markdown-renderer/replace-components/linemarker/line-number-marker'
import { LineKeys } from '../components/markdown-renderer/types'
import { buildTransformer } from '../components/markdown-renderer/utils/html-react-transformer'
import { calculateNewLineNumberMapping } from '../components/markdown-renderer/utils/line-number-mapping'
import { TocAst } from '../external-types/markdown-it-toc-done-right/interface'

export interface RenderMarkdownInput {
  content: string
  maxLength: number
  markdownItType: 'basic' | 'full'
  oldMarkdownLineKeys: LineKeys[]
  lastUsedLineId: number
  useFrontmatter: boolean
}

export interface TaskChecked {
  lineInMarkdown: number
  checked: boolean
}

export interface RenderMarkdownOutput {
  newLines: LineKeys[]
  newLastUsedLineId: number
  markdownReactDom: ReactElement[]
  yamlError?: boolean
  rawMeta?: RawYAMLMetadata
  toc?: TocAst
  lineMarkers?: LineMarkers[]
  tasksChecked: TaskChecked[]
}

// eslint-disable-next-line no-restricted-globals
addEventListener('message', event => {
  const data = event.data as RenderMarkdownInput
  const trimmedContent = data.content.substr(0, data.maxLength)
  const tasksChecked: TaskChecked[] = []

  let markdownIt = null

  let yamlError
  let rawMeta
  let toc
  let lineMarkers
  let allReplacers

  if (data.markdownItType === 'basic') {
    markdownIt = new BasicMarkdownItConfigurator()
      .pushConfig(alertContainer)
      .buildConfiguredMarkdownIt()
  } else if (data.markdownItType === 'full') {
    markdownIt = new FullMarkdownItConfigurator(
      data.useFrontmatter,
      error => {
        yamlError = error
      },
      newRawMeta => {
        rawMeta = newRawMeta
      },
      newToc => {
        toc = newToc
      },
      newLineMarkers => {
        lineMarkers = newLineMarkers
      }
    ).buildConfiguredMarkdownIt()
    allReplacers = useReplacerInstanceListCreator((newLineInMarkdown: number, newChecked: boolean) => {
      tasksChecked.push({
        lineInMarkdown: newLineInMarkdown,
        checked: newChecked
      })
    })()
  }

  if (markdownIt) {
    const html: string = markdownIt.render(trimmedContent)
    const contentLines = trimmedContent.split('\n')
    const { lines: newLines, lastUsedLineId: newLastUsedLineId } = calculateNewLineNumberMapping(contentLines, data.oldMarkdownLineKeys, data.lastUsedLineId)

    const transformer = allReplacers ? buildTransformer(newLines, allReplacers) : undefined

    // noinspection JSUnusedAssignment
    postMessage({
      newLines: newLines,
      newLastUsedLineId: newLastUsedLineId,
      markdownReactDom: ReactHtmlParser(html, { transform: transformer }),
      yamlError: yamlError,
      rawMeta: rawMeta,
      toc: toc,
      lineMarkers: lineMarkers,
      tasksChecked: tasksChecked
    }, '')
  }
})
