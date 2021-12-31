/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const worker: Worker = self as unknown as Worker

worker.addEventListener('message', (event: MessageEvent<string>) => {
  if (event.data === 'ping') {
    console.log('worker received ping')
    worker.postMessage('pong')
  } else {
    console.error('worker received unknown message')
  }
})
