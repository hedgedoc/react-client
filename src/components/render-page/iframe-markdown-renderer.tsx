/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, useMemo, useState } from 'react'
import type { ScrollState } from '../editor-page/synced-scroll/scroll-props'
import type { BaseConfiguration } from './window-post-message-communicator/rendering-message'
import { CommunicationMessageType, RendererType } from './window-post-message-communicator/rendering-message'
import { setDarkMode } from '../../redux/dark-mode/methods'
import { MarkdownDocument } from './markdown-document'
import { countWords } from './word-counter'
import { useRendererToEditorCommunicator } from '../editor-page/render-context/renderer-to-editor-communicator-context-provider'
import { useRendererReceiveHandler } from './window-post-message-communicator/hooks/use-renderer-receive-handler'
import { SlideshowMarkdownRenderer } from '../markdown-renderer/slideshow-markdown-renderer'
import { IframeSendingTaskListChangeCallbackContextProvider } from '../markdown-renderer/markdown-extension/task-list/iframe-sending-task-list-change-callback-context-provider'
import { IframeSendingImageClickCallbackContextProvider } from '../markdown-renderer/markdown-extension/image/iframe-sending-image-click-callback-context-provider'

export const IframeMarkdownRenderer: React.FC = () => {
  const [markdownContentLines, setMarkdownContentLines] = useState<string[]>([])
  const [scrollState, setScrollState] = useState<ScrollState>(() => ({ firstLineInView: 1, scrolledPercentage: 0 }))
  const [baseConfiguration, setBaseConfiguration] = useState<BaseConfiguration | undefined>(undefined)

  const communicator = useRendererToEditorCommunicator()

  const countWordsInRenderedDocument = useCallback(() => {
    const documentContainer = document.querySelector('[data-word-count-target]')
    communicator.sendMessageToOtherSide({
      type: CommunicationMessageType.ON_WORD_COUNT_CALCULATED,
      words: documentContainer ? countWords(documentContainer) : 0
    })
  }, [communicator])

  useRendererReceiveHandler(CommunicationMessageType.SET_BASE_CONFIGURATION, (values) => {
    setBaseConfiguration(values.baseConfiguration)
  })
  useRendererReceiveHandler(CommunicationMessageType.SET_MARKDOWN_CONTENT, (values) => {
    setMarkdownContentLines(values.content)
  })
  useRendererReceiveHandler(CommunicationMessageType.SET_DARKMODE, (values) => {
    setDarkMode(values.activated)
  })
  useRendererReceiveHandler(CommunicationMessageType.SET_SCROLL_STATE, (values) => {
    setScrollState(values.scrollState)
  })
  useRendererReceiveHandler(CommunicationMessageType.GET_WORD_COUNT, () => {
    countWordsInRenderedDocument()
  })

  const onFirstHeadingChange = useCallback(
    (firstHeading?: string) => {
      communicator.sendMessageToOtherSide({
        type: CommunicationMessageType.ON_FIRST_HEADING_CHANGE,
        firstHeading
      })
    },
    [communicator]
  )

  const onMakeScrollSource = useCallback(() => {
    communicator.sendMessageToOtherSide({
      type: CommunicationMessageType.SET_SCROLL_SOURCE_TO_RENDERER
    })
  }, [communicator])

  const onScroll = useCallback(
    (scrollState: ScrollState) => {
      communicator.sendMessageToOtherSide({
        type: CommunicationMessageType.SET_SCROLL_STATE,
        scrollState
      })
    },
    [communicator]
  )

  const onHeightChange = useCallback(
    (height: number) => {
      communicator.sendMessageToOtherSide({
        type: CommunicationMessageType.ON_HEIGHT_CHANGE,
        height
      })
    },
    [communicator]
  )

  const renderer = useMemo(() => {
    if (!baseConfiguration) {
      return null
    }
    switch (baseConfiguration.rendererType) {
      case RendererType.DOCUMENT:
        return (
          <MarkdownDocument
            additionalOuterContainerClasses={ 'vh-100 bg-light' }
            markdownContentLines={ markdownContentLines }
            onFirstHeadingChange={ onFirstHeadingChange }
            onMakeScrollSource={ onMakeScrollSource }
            scrollState={ scrollState }
            onScroll={ onScroll }
            baseUrl={ baseConfiguration.baseUrl }
          />
        )
      case RendererType.SLIDESHOW:
        return (
          <SlideshowMarkdownRenderer
            markdownContentLines={ markdownContentLines }
            baseUrl={ baseConfiguration.baseUrl }
            onFirstHeadingChange={ onFirstHeadingChange }
            onMakeScrollSource={ onMakeScrollSource }
            scrollState={ scrollState }
            onScroll={ onScroll }
            slideOptions={ {
              'autoSlide': 0,
              'autoSlideStoppable': false,
              'slideNumber': false,
              'transition':"false",
              'backgroundTransition': "false"
            } } //frontmatterInfo.slideOptions
          />
        )
      case RendererType.INTRO:
        return (
          <MarkdownDocument
            additionalOuterContainerClasses={ 'vh-100 bg-light overflow-y-hidden' }
            markdownContentLines={ markdownContentLines }
            baseUrl={ baseConfiguration.baseUrl }
            onHeightChange={ onHeightChange }
          />
        )
      default:
        return null
    }
  }, [
    baseConfiguration,
    markdownContentLines,
    onFirstHeadingChange,
    onHeightChange,
    onMakeScrollSource,
    onScroll,
    scrollState
  ])

  if (!baseConfiguration) {
    return null
  }

  return (
    <IframeSendingImageClickCallbackContextProvider>
      <IframeSendingTaskListChangeCallbackContextProvider>
        { renderer }
      </IframeSendingTaskListChangeCallbackContextProvider>
    </IframeSendingImageClickCallbackContextProvider>
  )
}
