/*
 * SPDX-FileCopyrightText: 2020 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { ChangeEvent, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../../../../../redux'
import { setEditorLigatures } from '../../../../../redux/editor/methods'
import { EditorPreferenceInput, EditorPreferenceInputType } from './editor-preference-input'

export const EditorPreferenceLigaturesSelect: React.FC = () => {
  const ligaturesEnabled = useSelector((state: ApplicationState) => Boolean(state.editorConfig.ligatures).toString())
  const saveLigatures = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    const ligaturesActivated: boolean = event.target.value === 'true'
    setEditorLigatures(ligaturesActivated)
  }, [])

  return (
    <EditorPreferenceInput onChange={saveLigatures} value={ligaturesEnabled} property={"ligatures"}
                           type={EditorPreferenceInputType.BOOLEAN}>
      <option value='false'>Off</option>
      <option value='true'>On</option>
    </EditorPreferenceInput>
  )
}
