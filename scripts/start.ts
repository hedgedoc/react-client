/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import webpack, { Configuration } from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import checkRequiredFiles from 'react-dev-utils/checkRequiredFiles'
import { buildPaths } from '../config/paths'
import openBrowser from 'react-dev-utils/openBrowser'
import { prepareProxy, prepareUrls, Urls } from 'react-dev-utils/WebpackDevServerUtils'
import chalk from 'chalk'
import browserslist from 'browserslist'
import { createWebpackConfig } from '../config/webpack.config'

process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

const paths = buildPaths()

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err
})
const createDevServerConfig = require('../config/webpackDevServer.config').createDevServerConfig

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1)
}

// Tools like Cloud9 rely on this.
const DEFAULT_PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001
const HOST = process.env.HOST || '0.0.0.0'

if (process.env.HOST) {
  console.log(
    chalk.cyan(
      `Attempting to bind to HOST environment variable: ${ chalk.yellow(
        chalk.bold(process.env.HOST)
      ) }`
    )
  )
  console.log(
    `If this was unintentional, check that you haven't mistakenly set it in your shell.`
  )
  console.log(
    `Learn more here: ${ chalk.yellow('https://cra.link/advanced-config') }`
  )
  console.log()
}
browserslist.loadConfig({ path: '.' })
try {
  const config = createWebpackConfig('development') as Configuration
  const protocol = process.env.HTTPS === 'true' ? 'https' : 'http'
  // const appName = require(paths.appPackageJson).name
  // const tscCompileOnError = process.env.TSC_COMPILE_ON_ERROR === 'true'
  const urls = (prepareUrls as unknown as ((protocol: string, host: string, port: number, pathname: string) => Urls))(
    protocol,
    HOST,
    DEFAULT_PORT,
    paths.publicUrlOrPath.slice(0, -1)
  )
  /*  const devSocket = {
   warnings: warnings =>
   devServer.sockWrite(devServer.sockets, 'warnings', warnings),
   errors: errors =>
   devServer.sockWrite(devServer.sockets, 'errors', errors)
   }*/
  // Create a webpack compiler that is configured with custom messages.
  /* const compiler = createCompiler({
   appName,
   config,
   devSocket,
   urls,
   useYarn: true,
   useTypeScript: true,
   tscCompileOnError,
   webpack,
   });*/
  let compiler
  try {
    compiler = webpack(config)
  } catch (err: unknown) {
    console.log(chalk.red('Failed to compile.'))
    console.log()
    console.log((err as Error).message || err)
    console.log()
    process.exit(1)
  }
  // Load proxy config
  const proxySetting = require(paths.appPackageJson).proxy
  const proxyConfig = prepareProxy(
    proxySetting,
    paths.appPublic,
    paths.publicUrlOrPath
  )
  // Serve webpack assets generated by the compiler over a web server.
  const serverConfig = createDevServerConfig(
    proxyConfig,
    urls.lanUrlForConfig
  )
  const devServer = new WebpackDevServer(compiler, serverConfig)
  // Launch WebpackDevServer.
  devServer.listen(DEFAULT_PORT, HOST, err => {
    if (err) {
      return console.log(err)
    }

    console.log(chalk.cyan('Starting the development server...\n'))
    openBrowser(urls.localUrlForBrowser)
  });

  ['SIGINT', 'SIGTERM'].forEach(function (sig) {
    process.on(sig, function () {
      devServer.close()
      process.exit()
    })
  })

  if (process.env.CI !== 'true') {
    // Gracefully exit when stdin ends
    process.stdin.on('end', function () {
      devServer.close()
      process.exit()
    })
  }

} catch (err) {
  if (err && (err as Error).message) {
    console.log((err as Error).message)
  }
  process.exit(1)
}

export {}
