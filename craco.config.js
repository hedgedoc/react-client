/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

const CopyPlugin = require('copy-webpack-plugin');
const { when } = require('@craco/craco');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  webpack: {
    configure: {
      stats: {
        warningsFilter: [/Critical dependency: the request of a dependency is an expression/i],
      }
    },
    plugins: {
      add: [
        new CopyPlugin({
          patterns: [
            { from: 'node_modules/@hpcc-js/wasm/dist/graphvizlib.wasm', to: 'static/js' },
            { from: 'node_modules/@hpcc-js/wasm/dist/expatlib.wasm', to: 'static/js' },
            { from: 'node_modules/emoji-picker-element-data/en/emojibase/data.json', to: 'static/js/emoji-data.json' }
          ],
        }),
        ...when(Boolean(process.env.ANALYZE), () => [
          new BundleAnalyzerPlugin({
            analyzerMode: "static",
            generateStatsFile: true
          })
        ], [])
      ]
    }
  }
}
