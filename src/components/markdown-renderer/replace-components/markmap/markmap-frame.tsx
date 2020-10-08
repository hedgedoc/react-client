import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import { ForkAwesomeIcon } from '../../../common/fork-awesome/fork-awesome-icon'

export interface MarkmapFrameProps {
  code: string
}

const blockHandler = (event: Event): void => {
  event.stopPropagation()
}

export const MarkmapFrame: React.FC<MarkmapFrameProps> = ({ code }) => {
  const diagramContainer = useRef<HTMLDivElement>(null)
  const [disablePanAndZoom, setDisablePanAndZoom] = useState<boolean>()

  useEffect(() => {
    console.log('called useEffect')
    if (diagramContainer.current) {
      if (disablePanAndZoom) {
        console.log('addedEventListener')
        diagramContainer.current.addEventListener('wheel', blockHandler, true)
        diagramContainer.current.addEventListener('mousedown', blockHandler, true)
        diagramContainer.current.addEventListener('click', blockHandler, true)
        diagramContainer.current.addEventListener('dblclick', blockHandler, true)
        diagramContainer.current.addEventListener('touchstart', blockHandler, true)
      } else {
        console.log('removedEventListener')
        diagramContainer.current.removeEventListener('wheel', blockHandler)
        diagramContainer.current.removeEventListener('mousedown', blockHandler)
        diagramContainer.current.removeEventListener('click', blockHandler)
        diagramContainer.current.removeEventListener('dblclick', blockHandler)
        diagramContainer.current.removeEventListener('touchstart', blockHandler)
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

  return (
    <Fragment>
      <div className={'text-center'} ref={diagramContainer}/>
      <div className={'text-right button-inside'}>
        <Button variant='dark' size='sm' onClick={() => setDisablePanAndZoom(current => !current)}>
          { disablePanAndZoom
            ? <ForkAwesomeIcon icon='lock'/>
            : <ForkAwesomeIcon icon='unlock'/>
          }
        </Button>
      </div>
    </Fragment>
  )
}
