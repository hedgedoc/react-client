/*
SPDX-FileCopyrightText: 2020 The HedgeDoc developers (see AUTHORS file)

SPDX-License-Identifier: AGPL-3.0-only
*/

import equal from "fast-deep-equal"
import React, { ChangeEvent, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../../../../../redux'
import { mergeEditorPreferences } from '../../../../../redux/editor/methods'
import { EditorPreferenceInput, EditorPreferenceInputType } from './editor-preference-input'

export enum EditorPreferenceProperty {
  KEYMAP = 'keyMap',
  THEME = 'theme',
  INDENT_WITH_TABS = 'indentWithTabs',
  INDENT_UNIT = 'indentUnit',
  SPELL_CHECK = 'spellcheck'
}

export interface EditorPreferenceSelectProps {
  property: EditorPreferenceProperty
}

const getInputType = (type: EditorPreferenceProperty): EditorPreferenceInputType => {
  switch (type) {
    case EditorPreferenceProperty.INDENT_UNIT:
      return EditorPreferenceInputType.NUMBER
    case EditorPreferenceProperty.INDENT_WITH_TABS:
      return EditorPreferenceInputType.BOOLEAN
    case EditorPreferenceProperty.KEYMAP:
      return EditorPreferenceInputType.STRING
    case EditorPreferenceProperty.SPELL_CHECK:
      return EditorPreferenceInputType.STRING
    case EditorPreferenceProperty.THEME:
      return EditorPreferenceInputType.STRING
    default:
      return EditorPreferenceInputType.STRING
  }
}

export const EditorPreferencePropertyInput: React.FC<EditorPreferenceSelectProps> = ({ property,  children }) => {
  const preference = useSelector((state: ApplicationState) => state.editorConfig.preferences[property]?.toString() || '', equal)

  const inputType = getInputType(property)

  const selectItem = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    let selectedItem: string | boolean | number = event.target.value

    if (inputType === EditorPreferenceInputType.NUMBER) {
      selectedItem = parseInt(selectedItem)
    } else if (inputType === EditorPreferenceInputType.BOOLEAN) {
      selectedItem = selectedItem === 'true'
    }

    mergeEditorPreferences({
      [property]: selectedItem
    })
  }, [inputType, property])

  return (
    <EditorPreferenceInput onChange={selectItem} property={property} type={inputType} value={preference}>
      { children }
    </EditorPreferenceInput>
  )
}
