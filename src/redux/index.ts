/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { allReducers } from './reducers'
import type { ApplicationState } from './application-state'

export const store = createStore(allReducers, composeWithDevTools())

export const getGlobalState = (): ApplicationState => store.getState()
