/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import MarkdownIt from 'markdown-it/lib'
import { useMemo } from 'react'
import type { ComponentReplacer, ValidReactDomElement } from '../replace-components/component-replacer'
import convertHtmlToReact from '@hedgedoc/html-to-react'
import { NodeToReactTransformer } from '../utils/node-to-react-transformer'
import { LineIdMapper } from '../utils/line-id-mapper'
import type { MarkdownExtension } from '../markdown-extension/markdown-extension'
import type { NodeProcessor } from '../node-preprocessors/node-processor'
import type { Document } from 'domhandler'
import { SanitizerMarkdownExtension } from '../markdown-extension/sanitizer/sanitizer-markdown-extension'

/**
 * Renders markdown code into react elements
 *
 * @param markdownCode The markdown code that should be rendered
 * @param additionalMarkdownExtensions A list of {@link MarkdownExtension markdown extensions} that should be used
 * @param newlinesAreBreaks Defines if the alternative break mode of markdown it should be used
 * @return The React DOM that represents the rendered markdown code
 */
export const useConvertMarkdownToReactDom = (
  markdownCode: string,
  additionalMarkdownExtensions: MarkdownExtension[],
  newlinesAreBreaks?: boolean
): ValidReactDomElement[] => {
  const lineNumberMapper = useMemo(() => new LineIdMapper(), [])
  const htmlToReactTransformer = useMemo(() => new NodeToReactTransformer(), [])
  const markdownExtensions = useMemo(() => {
    const tagNameWhiteList = additionalMarkdownExtensions.reduce(
      (state, extension) => [...state, ...extension.buildTagNameWhitelist()],
      [] as string[]
    )
    return [...additionalMarkdownExtensions, new SanitizerMarkdownExtension(tagNameWhiteList)]
  }, [additionalMarkdownExtensions])

  const markdownIt = useMemo(() => {
    const newMarkdownIt = new MarkdownIt('default', {
      html: true,
      breaks: newlinesAreBreaks ?? true,
      langPrefix: '',
      typographer: true
    })
    markdownExtensions.forEach((extension) =>
      newMarkdownIt.use((markdownIt) => extension.configureMarkdownIt(markdownIt))
    )
    markdownExtensions.forEach((extension) =>
      newMarkdownIt.use((markdownIt) => extension.configureMarkdownItPost(markdownIt))
    )
    return newMarkdownIt
  }, [markdownExtensions, newlinesAreBreaks])

  useMemo(() => {
    const replacers = markdownExtensions.reduce(
      (state, extension) => [...state, ...extension.buildReplacers()],
      [] as ComponentReplacer[]
    )
    htmlToReactTransformer.setReplacers(replacers)
  }, [htmlToReactTransformer, markdownExtensions])

  useMemo(() => {
    htmlToReactTransformer.setLineIds(lineNumberMapper.updateLineMapping(markdownCode))
  }, [htmlToReactTransformer, lineNumberMapper, markdownCode])

  const nodePreProcessor = useMemo(() => {
    return markdownExtensions
      .reduce((state, extension) => [...state, ...extension.buildNodeProcessors()], [] as NodeProcessor[])
      .reduce(
        (state, processor) => (document: Document) => state(processor.process(document)),
        (document: Document) => document
      )
  }, [markdownExtensions])

  return useMemo(() => {
    const html = markdownIt.render(markdownCode)

    htmlToReactTransformer.resetReplacers()

    return convertHtmlToReact(html, {
      transform: (node, index) => htmlToReactTransformer.translateNodeToReactElement(node, index),
      preprocessNodes: (document) => nodePreProcessor(document)
    })
  }, [htmlToReactTransformer, markdownCode, markdownIt, nodePreProcessor])
}
