/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { PropsWithChildren } from 'react'
import React, { createContext, useContext, useEffect, useMemo } from 'react'
import { RendererToEditorCommunicator } from '../../render-page/window-post-message-communicator/renderer-to-editor-communicator'
import { CommunicationMessageType } from '../../render-page/window-post-message-communicator/rendering-message'
import { ORIGIN_TYPE, useOriginFromConfig } from './use-origin-from-config'

const RendererToEditorCommunicatorContext = createContext<RendererToEditorCommunicator | undefined>(undefined)

/**
 * Provides the {@link RendererToEditorCommunicator renderer to editor iframe communicator} that is set by a {@link RendererToEditorCommunicatorContextProvider context provider}.
 *
 * @return the received communicator
 * @throws {Error} if no communicator was received
 */
export const useRendererToEditorCommunicator: () => RendererToEditorCommunicator = () => {
  const communicatorFromContext = useContext(RendererToEditorCommunicatorContext)
  if (!communicatorFromContext) {
    throw new Error('No renderer-to-editor-iframe-communicator received. Did you forget to use the provider component?')
  }
  return communicatorFromContext
}

export const RendererToEditorCommunicatorContextProvider: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  const editorOrigin = useOriginFromConfig(ORIGIN_TYPE.EDITOR)
  const communicator = useMemo<RendererToEditorCommunicator>(() => new RendererToEditorCommunicator(), [])

  useEffect(() => {
    const currentCommunicator = communicator
    currentCommunicator.setMessageTarget(window.parent, editorOrigin)
    currentCommunicator.registerEventListener()
    currentCommunicator.enableCommunication()
    currentCommunicator.sendMessageToOtherSide({
      type: CommunicationMessageType.RENDERER_READY
    })
    return () => currentCommunicator?.unregisterEventListener()
  }, [communicator, editorOrigin])

  /**
   * Provides a {@link RendererToEditorCommunicator renderer to editor communicator} for the child components via Context.
   */
  return (
    <RendererToEditorCommunicatorContext.Provider value={communicator}>
      {children}
    </RendererToEditorCommunicatorContext.Provider>
  )
}
