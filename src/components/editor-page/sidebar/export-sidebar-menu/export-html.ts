/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { download } from '../../../common/download/download'

export const exportHtmlRequest = (raw: boolean, title: string): void => {
  if (raw) {
    exportRawHtml(title)
  } else {
    exportProcessedHtml(title)
  }
}

const exportRawHtml = (title: string): void => {
  const container = document.getElementsByClassName('markdown-body')
  if (!container || container.length < 1) {
    console.error('Could not find markdown content to download')
    return
  }
  const html = container[0].innerHTML
  download(html, `${ title }.html`, 'text/html')
}

const exportProcessedHtml = (title: string): void => {
  console.debug(`Download processed HTML as ${ title }.html`)
}
