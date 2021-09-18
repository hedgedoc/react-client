/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import equal from 'fast-deep-equal'
import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { useApplicationState } from '../../../hooks/common/use-application-state'
import { isTestMode } from '../../../utils/test-modes'
import { RendererProps } from '../../render-page/markdown-document'
import {
  CommunicationMessageType,
  ImageClickedMessage,
  ImageDetails,
  OnFirstHeadingChangeMessage,
  OnHeightChangeMessage,
  OnTaskCheckboxChangeMessage,
  RendererType,
  SetScrollStateMessage
} from '../../render-page/window-post-message-communicator/rendering-message'
import { useEditorToRendererCommunicator } from '../render-context/iframe-editor-to-renderer-communicator-context-provider'
import { ScrollState } from '../synced-scroll/scroll-props'
import { useOnIframeLoad } from './hooks/use-on-iframe-load'
import { ShowOnPropChangeImageLightbox } from './show-on-prop-change-image-lightbox'
import { setRendererStatus } from '../../../redux/renderer-status/methods'
import { useEditorReceiveHandler } from '../../render-page/window-post-message-communicator/hooks/use-editor-receive-handler'
import { useDoIfRendererReady } from '../../render-page/window-post-message-communicator/hooks/use-do-if-renderer-ready'
import { useRendererReady } from '../../render-page/window-post-message-communicator/hooks/use-renderer-ready'
import { useSendDarkModeStatus } from './hooks/use-send-dark-mode-status'

export interface RenderIframeProps extends RendererProps {
  rendererType: RendererType
  forcedDarkMode?: boolean
  frameClasses?: string
}

export const RenderIframe: React.FC<RenderIframeProps> = ({
  markdownContent,
  onTaskCheckedChange,
  scrollState,
  onFirstHeadingChange,
  onScroll,
  onMakeScrollSource,
  frameClasses,
  rendererType,
  forcedDarkMode
}) => {
  const [lightboxDetails, setLightboxDetails] = useState<ImageDetails | undefined>(undefined)

  const frameReference = useRef<HTMLIFrameElement>(null)
  const frontmatterInfo = useApplicationState((state) => state.noteDetails.frontmatterRendererInfo)
  const rendererOrigin = useApplicationState((state) => state.config.iframeCommunication.rendererOrigin)
  const renderPageUrl = `${rendererOrigin}render`
  const resetRendererReady = useCallback(() => setRendererStatus(false), [])
  const iframeCommunicator = useEditorToRendererCommunicator()
  const rendererReady = useRendererReady()
  const onIframeLoad = useOnIframeLoad(
    frameReference,
    iframeCommunicator,
    rendererOrigin,
    renderPageUrl,
    resetRendererReady
  )
  const [frameHeight, setFrameHeight] = useState<number>(0)

  useEffect(
    () => () => {
      iframeCommunicator.unregisterEventListener()
      setRendererStatus(false)
    },
    [iframeCommunicator]
  )

  useEditorReceiveHandler(
    CommunicationMessageType.ON_FIRST_HEADING_CHANGE,
    useCallback(
      (values: OnFirstHeadingChangeMessage) => onFirstHeadingChange?.(values.firstHeading),
      [onFirstHeadingChange]
    )
  )

  useEditorReceiveHandler(
    CommunicationMessageType.SET_SCROLL_STATE,
    useCallback((values: SetScrollStateMessage) => onScroll?.(values.scrollState), [onScroll])
  )

  useEditorReceiveHandler(
    CommunicationMessageType.SET_SCROLL_SOURCE_TO_RENDERER,
    useCallback(() => onMakeScrollSource?.(), [onMakeScrollSource])
  )

  useEditorReceiveHandler(
    CommunicationMessageType.ON_TASK_CHECKBOX_CHANGE,
    useCallback(
      (values: OnTaskCheckboxChangeMessage) => onTaskCheckedChange?.(values.lineInMarkdown, values.checked),
      [onTaskCheckedChange]
    )
  )

  useEditorReceiveHandler(
    CommunicationMessageType.IMAGE_CLICKED,
    useCallback((values: ImageClickedMessage) => setLightboxDetails?.(values.details), [setLightboxDetails])
  )

  useEditorReceiveHandler(
    CommunicationMessageType.ON_HEIGHT_CHANGE,
    useCallback((values: OnHeightChangeMessage) => setFrameHeight?.(values.height), [setFrameHeight])
  )

  useEditorReceiveHandler(
    CommunicationMessageType.RENDERER_READY,
    useCallback(() => {
      iframeCommunicator.enableCommunication()
      iframeCommunicator.sendMessageToOtherSide({
        type: CommunicationMessageType.SET_BASE_CONFIGURATION,
        baseConfiguration: {
          baseUrl: window.location.toString(),
          rendererType
        }
      })
      setRendererStatus(true)
    }, [iframeCommunicator, rendererType])
  )

  useSendDarkModeStatus(forcedDarkMode)

  const oldScrollState = useRef<ScrollState | undefined>(undefined)
  useDoIfRendererReady(
    useCallback(() => {
      if (scrollState && !equal(scrollState, oldScrollState.current)) {
        oldScrollState.current = scrollState
        iframeCommunicator.sendMessageToOtherSide({ type: CommunicationMessageType.SET_SCROLL_STATE, scrollState })
      }
    }, [iframeCommunicator, scrollState])
  )

  useDoIfRendererReady(
    useCallback(() => {
      iframeCommunicator.sendMessageToOtherSide({
        type: CommunicationMessageType.SET_MARKDOWN_CONTENT,
        content: markdownContent
      })
    }, [iframeCommunicator, markdownContent])
  )

  useDoIfRendererReady(
    useCallback(() => {
      if (frontmatterInfo !== undefined) {
        iframeCommunicator.sendMessageToOtherSide({
          type: CommunicationMessageType.SET_FRONTMATTER_INFO,
          frontmatterInfo
        })
      }
    }, [frontmatterInfo, iframeCommunicator])
  )

  return (
    <Fragment>
      <ShowOnPropChangeImageLightbox details={lightboxDetails} />
      <iframe
        style={{ height: `${frameHeight}px` }}
        data-cy={'documentIframe'}
        onLoad={onIframeLoad}
        title='render'
        src={renderPageUrl}
        {...(isTestMode() ? {} : { sandbox: 'allow-downloads allow-same-origin allow-scripts allow-popups' })}
        ref={frameReference}
        className={`border-0 ${frameClasses ?? ''}`}
        data-content-ready={rendererReady}
      />
    </Fragment>
  )
}
