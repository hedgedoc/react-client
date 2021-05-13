/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Stats } from 'webpack'
import { OpaqueFileSizes } from 'react-dev-utils/FileSizeReporter'

export interface BuildResult {
  stats: Stats,
  previousFileSizes: OpaqueFileSizes,
  warnings: string[]
}
