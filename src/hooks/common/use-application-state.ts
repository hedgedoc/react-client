/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useSelector } from 'react-redux'
import { ApplicationState } from '../../redux'
import equal from 'fast-deep-equal'

export const useApplicationState = <TSelected>(
  selector: (state: ApplicationState) => TSelected,
  equalityFn?: (a: TSelected, b: TSelected) => boolean
): TSelected => {
  return useSelector<ApplicationState, TSelected>(selector, equalityFn ? equalityFn : equal)
}
