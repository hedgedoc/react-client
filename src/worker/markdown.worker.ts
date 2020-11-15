import { RawYAMLMetadata } from '../components/editor/yaml-metadata/yaml-metadata'
import { BasicMarkdownItConfigurator } from '../components/markdown-renderer/markdown-it-configurator/BasicMarkdownItConfigurator'
import { FullMarkdownItConfigurator } from '../components/markdown-renderer/markdown-it-configurator/FullMarkdownItConfigurator'
import { alertContainer } from '../components/markdown-renderer/markdown-it-plugins/alert-container'
import { LineMarkers } from '../components/markdown-renderer/replace-components/linemarker/line-number-marker'
import { LineKeys } from '../components/markdown-renderer/types'
import { calculateNewLineNumberMapping } from '../components/markdown-renderer/utils/line-number-mapping'
import { TocAst } from '../external-types/markdown-it-toc-done-right/interface'

export interface RenderMarkdownInput {
  content: string
  maxLength: number
  markdownItType: 'basic' | 'full'
  oldMarkdownLineKeys: LineKeys[]
  lastUsedLineId: number
  useFrontmatter: boolean
  plantumlServer: string | null
}

export interface TaskChecked {
  lineInMarkdown: number
  checked: boolean
}

export interface RenderMarkdownOutput {
  newLines: LineKeys[]
  newLastUsedLineId: number
  htmlOutput: string
  yamlError?: boolean
  rawMeta?: RawYAMLMetadata
  toc?: TocAst
  lineMarkers?: LineMarkers[]
  debugOutput: string[]
}

// eslint-disable-next-line no-restricted-globals
export function render (data: RenderMarkdownInput): RenderMarkdownOutput {
  const trimmedContent = data.content.substr(0, data.maxLength)

  let markdownIt
  let yamlError
  let rawMeta
  let toc
  let lineMarkers
  const debugOutput: string[] = []
  const debuger = (output: string) => {
    debugOutput.push(output)
  }

  if (data.markdownItType === 'basic') {
    markdownIt = new BasicMarkdownItConfigurator(debuger)
      .pushConfig(alertContainer)
      .buildConfiguredMarkdownIt()
  } else {
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
      },
      data.plantumlServer,
      debuger
    ).buildConfiguredMarkdownIt()
  }

  const html: string = markdownIt.render(trimmedContent)
  const contentLines = trimmedContent.split('\n')
  const { lines: newLines, lastUsedLineId: newLastUsedLineId } = calculateNewLineNumberMapping(contentLines, data.oldMarkdownLineKeys, data.lastUsedLineId)

  // noinspection JSUnusedAssignment
  return {
    newLines: newLines,
    newLastUsedLineId: newLastUsedLineId,
    htmlOutput: html,
    yamlError: yamlError,
    rawMeta: rawMeta,
    toc: toc,
    lineMarkers: lineMarkers,
    debugOutput: debugOutput
  }
}
