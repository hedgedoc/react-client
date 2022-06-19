/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { YDocMessageTransporter } from '@hedgedoc/realtime'
import type { Doc } from 'yjs'
import type { Awareness } from 'y-protocols/awareness'

/**
 * A mocked connection that doesn't send or receive any data and is instantly ready.
 */
export class MockConnection extends YDocMessageTransporter {
  constructor(doc: Doc, awareness: Awareness) {
    super(doc, awareness)
    this.onOpen()
    this.emit('ready')
  }

  /**
   * Inserts the given content at position 0 of the editor yText.
   *
   * @param content The content to insert
   */
  public insertContent(content: string): void {
    const yText = this.doc.getText('markdownContent')
    yText.insert(0, content)
    super.markAsSynced()
  }

  disconnect(): void {
    //Intentionally left empty because this is a mocked connection
  }

  send(): void {
    //Intentionally left empty because this is a mocked connection
  }
}
