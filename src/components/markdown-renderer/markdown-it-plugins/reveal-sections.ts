/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import MarkdownIt from 'markdown-it/lib'
import Token from 'markdown-it/lib/token'
import StateCore from 'markdown-it/lib/rules_core/state_core'

/**
 * This functions adds a 'section close' token at currentTokenIndex in the state's token array,
 * replacing the current token, if replaceCurrentToken is true.
 * It also returns the currentTokenIndex, that will be increased only if the previous token was not replaced.
 * @param {number} currentTokenIndex - the current position in the tokens array
 * @param {StateCore} state - the state core
 * @param {boolean} replaceCurrentToken  - if the currentToken should be replaced
 */
const addSectionClose = (currentTokenIndex: number, state: StateCore, replaceCurrentToken: boolean): void => {
  const sectionCloseToken = new Token("section", "section", -1)
  state.tokens.splice(currentTokenIndex, replaceCurrentToken ? 1 : 0, sectionCloseToken)
}

/**
 * This functions adds a 'section open' token at insertIndex in the state's token array.
 * @param {number} insertIndex - the index at which the token should be added
 * @param {StateCore} state - the state core
 */
const addSectionOpen = (insertIndex: number, state: StateCore): void => {
  const sectionOpenToken = new Token("section", "section", 1)
  state.tokens.splice(insertIndex, 0, sectionOpenToken)
}

export const revealSections: MarkdownIt.PluginSimple = (md: MarkdownIt) => {
  md.core.ruler.push('reveal', (state) => {
    let sectionBeginIndex = 0
    let lastSectionWasBranch = false

    for (let currentTokenIndex = 0; currentTokenIndex < state.tokens.length; currentTokenIndex++) {
      const currentToken = state.tokens[currentTokenIndex]

      if (currentToken.type !== 'hr') {
        continue // skip tokens that are not `hr`
      }

      addSectionOpen(sectionBeginIndex, state)
      currentTokenIndex += 1 // we create a new token, therefore the index is incremented

      if (currentToken.markup === '---' && lastSectionWasBranch) {
        lastSectionWasBranch = false
        addSectionClose(currentTokenIndex, state, false)
        currentTokenIndex += 1 // we create a new token, therefore the index is incremented
        sectionBeginIndex = currentTokenIndex + 1 // the new section begins with the first token after the close
      } else if(currentToken.markup === '----' && !lastSectionWasBranch) {
        lastSectionWasBranch = true
        addSectionOpen(sectionBeginIndex, state)
        currentTokenIndex += 1 // we create a new token, therefore the index is incremented
      }

      addSectionClose(currentTokenIndex, state, true)
      sectionBeginIndex = currentTokenIndex + 1 // the new section begins with the first token after the close
    }

    addSectionOpen(sectionBeginIndex, state)
    addSectionClose(state.tokens.length, state, false)
    if (lastSectionWasBranch) {
      addSectionClose(state.tokens.length, state, false)
    }
    return true
  })
}
