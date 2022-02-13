/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react'
import { EditorToRendererCommunicatorContextProvider } from '../../components/editor-page/render-context/editor-to-renderer-communicator-context-provider'
import type { NextPage } from 'next'
import { EditorPageContent } from '../../components/editor-page/editor-page-content'

/**
 * Renders a page that is used by the user to edit markdown notes. It contains the editor and a renderer.
 */
export const EditorPage: NextPage = () => {
  return (
    <EditorToRendererCommunicatorContextProvider>
      <EditorPageContent />
    </EditorToRendererCommunicatorContextProvider>
  )
}

export default EditorPage
