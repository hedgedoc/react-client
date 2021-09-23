/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { createContext, useContext, useMemo } from 'react'
import { EditorToRendererCommunicator } from '../../render-page/window-post-message-communicator/editor-to-renderer-communicator'

const EditorToRendererCommunicatorContext = createContext<EditorToRendererCommunicator | undefined>(undefined)

/**
 * Provides the {@link EditorToRendererCommunicator editor to renderer iframe communicator} that is set by a {@link EditorToRendererCommunicatorContextProvider context provider}.
 *
 * @return the received communicator
 * @throws Error if no communicator was received
 */
export const useEditorToRendererCommunicator: () => EditorToRendererCommunicator = () => {
  const communicatorFromContext = useContext(EditorToRendererCommunicatorContext)
  if (!communicatorFromContext) {
    throw new Error('No editor-to-renderer-iframe-communicator received. Did you forget to use the provider component?')
  }
  return communicatorFromContext
}

/**
 * Provides a {@link EditorToRendererCommunicator editor to renderer communicator} for the child components via Context.
 */
export const EditorToRendererCommunicatorContextProvider: React.FC = ({ children }) => {
  const communicator = useMemo<EditorToRendererCommunicator>(() => new EditorToRendererCommunicator(), [])

  return (
    <EditorToRendererCommunicatorContext.Provider value={communicator}>
      {children}
    </EditorToRendererCommunicatorContext.Provider>
  )
}
