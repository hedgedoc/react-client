/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { EditorView } from '@codemirror/view'
import type { EditorState, Text } from '@codemirror/state'
import { Mock } from 'ts-mockery'

export const mockEditorView = (content: string): EditorView => {
  const docMock = Mock.of<Text>()
  docMock.toString = () => content
  return Mock.of<EditorView>({
    state: Mock.of<EditorState>({
      doc: docMock
    }),
    dispatch: jest.fn()
  })
}
