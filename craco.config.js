/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

const WorkerPlugin = require('worker-plugin')
const CopyPlugin = require('copy-webpack-plugin');
const { when } = require('@craco/craco');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  webpack: {
    plugins: {
      add: [
        new WorkerPlugin(),
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
