import MarkdownIt from 'markdown-it'
import { ReactElement } from 'react'
import ReactHtmlParser from 'react-html-parser'
import { ComponentReplacer } from '../components/markdown-renderer/replace-components/ComponentReplacer'
import { LineKeys } from '../components/markdown-renderer/types'
import { buildTransformer } from '../components/markdown-renderer/utils/html-react-transformer'
import { calculateNewLineNumberMapping } from '../components/markdown-renderer/utils/line-number-mapping'

export interface RenderMarkdownInput {
  content: string
  maxLength: number
  markdownIt: MarkdownIt
  oldMarkdownLineKeys: LineKeys[]
  lastUsedLineId: number
  componentReplacers?: ComponentReplacer[]
}

export interface RenderMarkdownOutput {
  newLines: LineKeys[]
  newLastUsedLineId: number
  markdownReactDom: ReactElement[]
}

// eslint-disable-next-line no-restricted-globals
addEventListener('message', event => {
  const data = event.data as RenderMarkdownInput
  const trimmedContent = data.content.substr(0, data.maxLength)
  const html: string = data.markdownIt.render(trimmedContent)
  const contentLines = trimmedContent.split('\n')
  const { lines: newLines, lastUsedLineId: newLastUsedLineId } = calculateNewLineNumberMapping(contentLines, data.oldMarkdownLineKeys, data.lastUsedLineId)

  const transformer = data.componentReplacers ? buildTransformer(newLines, data.componentReplacers) : undefined
  postMessage({
    newLines: newLines,
    newLastUsedLineId: newLastUsedLineId,
    markdownReactDom: ReactHtmlParser(html, { transform: transformer })
  }, '')
})
