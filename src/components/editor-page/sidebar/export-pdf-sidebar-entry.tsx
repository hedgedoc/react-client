/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { SidebarButton } from './sidebar-button'
import links from '../../../links.json'
import { jsPDF } from 'jspdf'

export const ExportPdfSidebarEntry: React.FC = () => {
  useTranslation()

  const onClick = useCallback(() => {
    const pdfDoc = new jsPDF()
    // everything following here is EVIL and just for testing out jspdf!!
    const iframe = document.getElementsByTagName("iframe").item(0) as HTMLIFrameElement
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    pdfDoc.html(iframe.contentDocument.body.querySelector('.markdown-document-content > .position-relative'), {
      callback: doc => {
        doc.setProperties({
          creator: `HedgeDoc (${ links.webpage })`
        })
        doc.save('test.pdf')
      },
      x: 10,
      y: 10,
      html2canvas: {
        backgroundColor: '#ffffff'
      }
    }).catch(err => {
      console.error(err)
    })

  }, [])

  return (
    <SidebarButton icon={ 'file-pdf-o' } onClick={ onClick }>
      <Trans i18nKey={ 'editor.export.pdf' }/>
    </SidebarButton>
  )
}
