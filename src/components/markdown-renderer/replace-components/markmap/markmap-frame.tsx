/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LockButton } from '../../../common/lock-button/lock-button'
import '../../utils/button-inside.scss'
import { Logger } from '../../../../utils/logger'

const log = new Logger('markmap')

export interface MarkmapFrameProps {
  code: string
}

const blockHandler = (event: Event): void => {
  event.stopPropagation()
}

export const MarkmapFrame: React.FC<MarkmapFrameProps> = ({ code }) => {
  const { t } = useTranslation()
  const diagramContainer = useRef<HTMLDivElement>(null)
  const [disablePanAndZoom, setDisablePanAndZoom] = useState(true)

  useEffect(() => {
    if (diagramContainer.current) {
      if (disablePanAndZoom) {
        diagramContainer.current.addEventListener('wheel', blockHandler, true)
        diagramContainer.current.addEventListener('mousedown', blockHandler, true)
        diagramContainer.current.addEventListener('click', blockHandler, true)
        diagramContainer.current.addEventListener('dblclick', blockHandler, true)
        diagramContainer.current.addEventListener('touchstart', blockHandler, true)
      } else {
        diagramContainer.current.removeEventListener('wheel', blockHandler, true)
        diagramContainer.current.removeEventListener('mousedown', blockHandler, true)
        diagramContainer.current.removeEventListener('click', blockHandler, true)
        diagramContainer.current.removeEventListener('dblclick', blockHandler, true)
        diagramContainer.current.removeEventListener('touchstart', blockHandler, true)
      }
    }
  }, [diagramContainer, disablePanAndZoom])

  useEffect(() => {
    if (!diagramContainer.current) {
      return
    }
    const actualContainer = diagramContainer.current
    import(/* webpackChunkName: "markmap" */ './markmap-loader')
      .then(({ markmapLoader }) => {
        try {
          const svg: SVGSVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
          svg.setAttribute('width', '100%')
          actualContainer.querySelectorAll('svg').forEach((child) => child.remove())
          actualContainer.appendChild(svg)
          markmapLoader(svg, code)
        } catch (error) {
          log.error(error)
        }
      })
      .catch(() => {
        log.error('error while loading markmap')
      })
  }, [code])

  return (
    <div data-cy={'markmap'}>
      <div className={'svg-container'} ref={diagramContainer} />
      <div className={'text-right button-inside'}>
        <LockButton
          locked={disablePanAndZoom}
          onLockedChanged={(newState) => setDisablePanAndZoom(newState)}
          title={disablePanAndZoom ? t('renderer.markmap.locked') : t('renderer.markmap.unlocked')}
        />
      </div>
    </div>
  )
}
