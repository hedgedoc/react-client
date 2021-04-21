/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useApplyDarkMode } from '../../hooks/common/use-apply-dark-mode'
import { ApplicationState } from '../../redux'
import { setDarkMode } from '../../redux/dark-mode/methods'
import { setNoteFrontmatter } from '../../redux/note-details/methods'
import { NoteFrontmatter } from '../editor-page/note-frontmatter/note-frontmatter'
import { ScrollState } from '../editor-page/synced-scroll/scroll-props'
import { ImageClickHandler } from '../markdown-renderer/replace-components/image/image-replacer'
import { SlideshowMarkdownRenderer } from '../markdown-renderer/slideshow-markdown-renderer'
import { useImageClickHandler } from './hooks/use-image-click-handler'
import { IframeRendererToEditorCommunicator } from './iframe-renderer-to-editor-communicator'
import { MarkdownDocument } from './markdown-document'
import { BaseConfiguration, RendererType } from './rendering-message'

export const RenderPage: React.FC = () => {
  useApplyDarkMode()

  const [markdownContent, setMarkdownContent] = useState('')
  const [scrollState, setScrollState] = useState<ScrollState>({ firstLineInView: 1, scrolledPercentage: 0 })
  const [baseConfiguration, setBaseConfiguration] = useState<BaseConfiguration | undefined>(undefined)
  const [rendererType, setRendererType] = useState(RendererType.DOCUMENT)

  const editorOrigin = useSelector((state: ApplicationState) => state.config.iframeCommunication.editorOrigin)

  const iframeCommunicator = useMemo(() => {
    const newCommunicator = new IframeRendererToEditorCommunicator()
    newCommunicator.setOtherSide(window.parent, editorOrigin)
    return newCommunicator
  }, [editorOrigin])

  useEffect(() => {
    iframeCommunicator.sendRendererReady()
    return () => iframeCommunicator.unregisterEventListener()
  }, [iframeCommunicator])

  useEffect(() => iframeCommunicator.onSetBaseConfiguration(setBaseConfiguration), [iframeCommunicator])
  useEffect(() => iframeCommunicator.onSetMarkdownContent(setMarkdownContent), [iframeCommunicator])
  useEffect(() => iframeCommunicator.onSetDarkMode(setDarkMode), [iframeCommunicator])
  useEffect(() => iframeCommunicator.onSetScrollState(setScrollState), [iframeCommunicator, scrollState])
  useEffect(() => iframeCommunicator.onSetRendererType(setRendererType), [iframeCommunicator])

  const onTaskCheckedChange = useCallback((lineInMarkdown: number, checked: boolean) => {
    iframeCommunicator.sendTaskCheckBoxChange(lineInMarkdown, checked)
  }, [iframeCommunicator])

  const onFirstHeadingChange = useCallback((firstHeading?: string) => {
    iframeCommunicator.sendFirstHeadingChanged(firstHeading)
  }, [iframeCommunicator])

  const onMakeScrollSource = useCallback(() => {
    iframeCommunicator.sendSetScrollSourceToRenderer()
  }, [iframeCommunicator])

  const onFrontmatterChange = useCallback((frontmatter?: NoteFrontmatter) => {
    setNoteFrontmatter(frontmatter)
    iframeCommunicator.sendSetFrontmatter(frontmatter)
  }, [iframeCommunicator])

  const onScroll = useCallback((scrollState: ScrollState) => {
    iframeCommunicator.sendSetScrollState(scrollState)
  }, [iframeCommunicator])

  const onImageClick: ImageClickHandler = useImageClickHandler(iframeCommunicator)

  const onHeightChange = useCallback((height: number) => {
    iframeCommunicator.sendHeightChange(height)
  }, [iframeCommunicator])

  if (!baseConfiguration) {
    return null
  }

  switch (rendererType) {
    case RendererType.DOCUMENT:
      return (
        <MarkdownDocument
          additionalOuterContainerClasses={ 'vh-100 bg-light' }
          markdownContent={ markdownContent }
          onTaskCheckedChange={ onTaskCheckedChange }
          onFirstHeadingChange={ onFirstHeadingChange }
          onMakeScrollSource={ onMakeScrollSource }
          onFrontmatterChange={ onFrontmatterChange }
          scrollState={ scrollState }
          onScroll={ onScroll }
          baseUrl={ baseConfiguration.baseUrl }
          onImageClick={ onImageClick }/>
      )
    case RendererType.SLIDESHOW:
      return <SlideshowMarkdownRenderer
        markdownContent={ markdownContent }
        baseUrl={ baseConfiguration.baseUrl }
        onFrontmatterChange={ onFrontmatterChange }
        onFirstHeadingChange={ onFirstHeadingChange }
        onImageClick={ onImageClick }/>
    case RendererType.INTRO:
      return (
        <MarkdownDocument
          additionalOuterContainerClasses={ 'vh-100 bg-light overflow-y-hidden' }
          markdownContent={ markdownContent }
          baseUrl={ baseConfiguration.baseUrl }
          onImageClick={ onImageClick }
          disableToc={ true }
          onHeightChange={ onHeightChange }/>
      )
    default:
      return null
  }
}

export default RenderPage
