import React, { useEffect, useRef, useState } from 'react'

export interface MarkmapFrameProps {
  code: string
}

const wheelHandler = (event: Event): void => {
  console.log('event', event)
  event.stopPropagation()
}

const mousedownHandler = (event: MouseEvent): void => {
  console.log('event', event)
  if (event.button === 0) {
    event.stopPropagation()
  }
}

const touchHandler = (event: TouchEvent): void => {
  console.log('event', event)
  event.stopPropagation()
}

export const MarkmapFrame: React.FC<MarkmapFrameProps> = ({ code }) => {
  const diagramContainer = useRef<HTMLDivElement>(null)
  const [disablePanAndZoom, setDisablePanAndZoom] = useState<boolean>()

  useEffect(() => {
    if (diagramContainer.current) {
      if (disablePanAndZoom) {
        console.log('addedEventListener')
        diagramContainer.current.addEventListener('wheel', wheelHandler, true)
        diagramContainer.current.addEventListener('mousedown', mousedownHandler, true)
        diagramContainer.current.addEventListener('touchstart', touchHandler, true)
      } else {
        diagramContainer.current.removeEventListener('wheel', wheelHandler)
        diagramContainer.current.removeEventListener('mousedown', mousedownHandler)
        diagramContainer.current.removeEventListener('touchstart', touchHandler)
      }
    }
  }, [diagramContainer, disablePanAndZoom])

  useEffect(() => {
    if (!diagramContainer.current) {
      return
    }
    const actualContainer = diagramContainer.current
    Promise.all([import(/* webpackChunkName: "markmap" */ 'markmap-lib/dist/transform'), import(/* webpackChunkName: "markmap" */ 'markmap-lib/dist/view'), import(/* webpackChunkName: "markmap" */ 'markmap-lib/dist/util/loader')])
      .then(([transform, view, loader]) => {
        const svg: SVGSVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        svg.setAttribute('width', '100%')
        actualContainer.querySelectorAll('svg').forEach(child => child.remove())
        actualContainer.appendChild(svg)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { root, features } = transform.transform(code)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
        const { styles, scripts } = transform.getUsedAssets(features)
        if (styles) {
          loader.loadCSS(styles)
        }
        if (scripts) {
          loader.loadJS(scripts, { getMarkmap: () => view.Markmap })
            .catch(err => console.error(err))
        }
        view.Markmap.create(svg, {}, root)
        setDisablePanAndZoom(true)
      }).catch(() => { console.error('error while loading markmap') })
  }, [code])

  return <div className={'text-center'} ref={diagramContainer}/>
}
