/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import path from 'path'
import chalk from 'chalk'
import { buildPaths } from './paths'
import tsconfig from '../tsconfig.json'

function getAdditionalModulePaths(options: typeof tsconfig.compilerOptions) {
  const baseUrl = options.baseUrl
  const paths = buildPaths()

  if (!baseUrl) {
    return ''
  }

  const baseUrlResolved = path.resolve(paths.appPath, baseUrl)

  // We don't need to do anything if `baseUrl` is set to `node_modules`. This is
  // the default behavior.
  if (path.relative(paths.appNodeModules, baseUrlResolved) === '') {
    return null
  }

  // Allow the user set the `baseUrl` to `appSrc`.
  if (path.relative(paths.appSrc, baseUrlResolved) === '') {
    return [paths.appSrc]
  }

  // If the path is equal to the root directory we ignore it here.
  // We don't want to allow importing from the root directly as source files are
  // not transpiled outside of `src`. We do allow importing them with the
  // absolute path (e.g. `src/Components/Button.js`) but we set that up with
  // an alias.
  if (path.relative(paths.appPath, baseUrlResolved) === '') {
    return null
  }

  // Otherwise, throw an error.
  throw new Error(
    chalk.red.bold(
      'Your project\'s `baseUrl` can only be set to `src` or `node_modules`.' +
      ' Create React App does not support other values at this time.'
    )
  )
}

/**
 * Get webpack aliases based on the baseUrl of a compilerOptions object.
 *
 * @param {*} options
 */
function getWebpackAliases(options: typeof tsconfig.compilerOptions) {
  const paths = buildPaths()
  const baseUrl = options.baseUrl

  if (!baseUrl) {
    return {}
  }

  const baseUrlResolved = path.resolve(paths.appPath, baseUrl)

  if (path.relative(paths.appPath, baseUrlResolved) === '') {
    return {
      src: paths.appSrc
    }
  }
}

/**
 * Get jest aliases based on the baseUrl of a compilerOptions object.
 *
 * @param {*} options
 */
function getJestAliases(options: typeof tsconfig.compilerOptions) {
  const paths = buildPaths()
  const baseUrl = options.baseUrl

  if (!baseUrl) {
    return {}
  }

  const baseUrlResolved = path.resolve(paths.appPath, baseUrl)

  if (path.relative(paths.appPath, baseUrlResolved) === '') {
    return {
      '^src/(.*)$': '<rootDir>/src/$1'
    }
  }
}

export function getModules() {
  const options = tsconfig.compilerOptions || {}
  const additionalModulePaths = getAdditionalModulePaths(options)

  return {
    additionalModulePaths: additionalModulePaths,
    webpackAliases: getWebpackAliases(options),
    jestAliases: getJestAliases(options)
  }
}
