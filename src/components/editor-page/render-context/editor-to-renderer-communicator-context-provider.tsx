/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { createContext, useContext, useMemo } from 'react'
import { EditorToRendererCommunicator } from '../../render-page/window-post-message-communicator/editor-to-renderer-communicator'

const IFrameEditorToRendererCommunicatorContext = createContext<EditorToRendererCommunicator | undefined>(undefined)

/**
 * Provides the {@link EditorToRendererCommunicator editor to renderer iframe communicator} that is set by a {@link EditorToRendererCommunicatorContextProvider context provider}.
 *
 * @return the received communicator
 * @throws Error if no communicator was received
 */
export const useEditorToRendererCommunicator: () => EditorToRendererCommunicator = () => {
  const communicatorFromContext = useContext(IFrameEditorToRendererCommunicatorContext)
  if (!communicatorFromContext) {
    throw new Error('No editor-to-renderer-iframe-communicator received. Did you forget to use the provider component?')
  }
  return communicatorFromContext
}

export const EditorToRendererCommunicatorContextProvider: React.FC = ({ children }) => {
  const communicator = useMemo<EditorToRendererCommunicator>(() => new EditorToRendererCommunicator(), [])

  return (
    <IFrameEditorToRendererCommunicatorContext.Provider value={communicator}>
      {children}
    </IFrameEditorToRendererCommunicatorContext.Provider>
  )
}
