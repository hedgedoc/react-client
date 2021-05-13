/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import webpack, { Configuration, Stats, StatsCompilation, StatsError } from 'webpack'
import browserslist from 'browserslist'
import { FormattedWebpackMessages, formatWebpackMessages } from './formatWebpackMessages'
import printBuildError from 'react-dev-utils/printBuildError'
import FileSizeReporter, { OpaqueFileSizes } from 'react-dev-utils/FileSizeReporter'
import checkRequiredFiles from 'react-dev-utils/checkRequiredFiles'
import { buildPaths } from '../config/paths'
import fs from 'fs-extra'
import chalk from 'chalk'
import { createWebpackConfig } from '../config/webpack.config'
import { BuildResult } from './build-result'
import { WebpackErrorWithPostcss } from './webpack-error-with-postcss'
import bfj from 'bfj'

process.env.BABEL_ENV = 'production'
process.env.NODE_ENV = 'production'

const paths = buildPaths()

if (!process.env.REACT_APP_BACKEND_BASE_URL) {
  console.error('==============\nREACT_APP_BACKEND_BASE_URL not set.\n  Use this task only if you want to create a production build with a real backend. Otherwise use build:mock\n==============')
  process.exit(1)
}

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err
})

// These sizes are pretty large. We'll warn for bundles exceeding them.
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1)
}

browserslist.loadConfig({ path: '.' })

FileSizeReporter.measureFileSizesBeforeBuild(paths.appBuild)
                .then((previousFileSizes: OpaqueFileSizes) => build(previousFileSizes))
                .then(async (buildResult: BuildResult) => {
                  const shouldWriteStatsJson = process.argv
                                                      .slice(2)
                                                      .indexOf('--stats') !== -1
                  if (shouldWriteStatsJson) {
                    await bfj.write(paths.appBuild + '/bundle-stats.json', buildResult.stats.toJson())
                  }

                  return buildResult
                })
                .then(
                  ({ stats, previousFileSizes, warnings }: BuildResult) => {
                    if (warnings.length) {
                      console.log(chalk.yellow('Compiled with warnings.\n'))
                      console.log(warnings.join('\n\n'))
                    } else {
                      console.log(chalk.green('Compiled successfully.\n'))
                    }

                    console.log('File sizes after gzip:\n')
                    FileSizeReporter.printFileSizesAfterBuild(
                      stats,
                      previousFileSizes,
                      paths.appBuild,
                      WARN_AFTER_BUNDLE_GZIP_SIZE,
                      WARN_AFTER_CHUNK_GZIP_SIZE
                    )
                    console.log()
                  })
                .catch((err: Error) => {
                  console.log(chalk.red('Failed to compile.\n'))
                  printBuildError(err)
                  process.exit(1)
                })

async function doWebpackBuild(): Promise<Stats> {
  return new Promise<Stats>((resolve, reject) => {
    console.log('Creating an optimized production build...')
    const config = createWebpackConfig('production') as Configuration
    webpack(config)
      .run((err: WebpackErrorWithPostcss | undefined, stats: Stats | undefined) => {
        if (err) {
          let errMessage = err.message
          if (err.postcssNode) {
            console.debug('reject css error')
            reject(new Error(`${ err.message }CompileError: Begins at CSS selector ${ err.postcssNode.selector }`))
          } else {
            reject(new Error(errMessage))
          }
        } else if (stats) {
          resolve(stats)
        } else {
          reject(new Error('no error and no stats!'))
        }
      })
  })
}

function isObsoletePrismJsWarning(warning: StatsError): boolean {
  return warning.moduleName === './node_modules/prismjs/components/index.js'
    && warning.message === 'Critical dependency: the request of a dependency is an expression'
}

async function build(previousFileSizes: OpaqueFileSizes): Promise<BuildResult> {
  fs.emptyDirSync(paths.appBuild)
  const stats: Stats = await doWebpackBuild()

  const jsonStats: StatsCompilation = stats.toJson({ all: false, warnings: true, errors: true })
  jsonStats.warnings = jsonStats.warnings?.filter(warning => !isObsoletePrismJsWarning(warning))

  const messages: FormattedWebpackMessages = formatWebpackMessages(jsonStats)
  if (messages.errors.length > 0) {
    throw new Error(messages.errors.join('\n\n'))
  }

  if (process.env.CI && process.env.CI.toLowerCase() !== 'false' && messages.warnings.length > 0) {
    console.log(
      chalk.yellow(
        '\nTreating warnings as errors because process.env.CI = true.\n' +
        'Most CI servers set it automatically.\n'
      )
    )
    throw new Error(messages.warnings.join('\n\n'))
  }

  return {
    stats,
    previousFileSizes,
    warnings: messages.warnings
  }
}

export {}
