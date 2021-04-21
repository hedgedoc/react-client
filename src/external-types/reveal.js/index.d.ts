/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

declare module 'reveal.js' {
  export interface RevealOptions {
    plugins?: string[]
  }

  export default class Reveal {
    constructor(options: RevealOptions);

    public initialize(): void;

    public sync(): void;
  }
}
