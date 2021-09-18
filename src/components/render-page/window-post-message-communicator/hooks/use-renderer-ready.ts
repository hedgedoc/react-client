/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useApplicationState } from '../../../../hooks/common/use-application-state'

/**
 * Returns the current ready status of the renderer.
 */
export const useRendererReady = (): boolean => useApplicationState((state) => state.rendererStatus.rendererReady)
