/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useSelector } from 'react-redux'
import type { ApplicationState } from '../../redux'
import equal from 'fast-deep-equal'

/**
 * Accesses the global application state to retrieve information.
 *
 * @param selector A selector function that extracts the needed information from the state.
 * @param checkForEquality An optional custom equality function. If not provided then {@link equal equal from fast-deep-equal} will be used.
 */
export const useApplicationState = <TSelected>(
  selector: (state: ApplicationState) => TSelected,
  checkForEquality?: (a: TSelected, b: TSelected) => boolean
): TSelected => {
  return useSelector<ApplicationState, TSelected>(selector, checkForEquality ? checkForEquality : equal)
}
