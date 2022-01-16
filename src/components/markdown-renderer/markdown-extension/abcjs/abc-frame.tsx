/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { Fragment, useEffect, useMemo, useRef } from 'react'
import styles from './abc.module.scss'
import { Logger } from '../../../../utils/logger'
import type { CodeProps } from '../../replace-components/code-block-component-replacer'
import { cypressId } from '../../../../utils/cypress-attribute'

const log = new Logger('AbcFrame')

export const AbcFrame: React.FC<CodeProps> = ({ code }) => {
  const scoreContainerRef = useRef<HTMLDivElement>(null)

  const randomId = useMemo(() => Math.random().toString(36).slice(7), [])

  useEffect(() => {
    if (!scoreContainerRef.current) {
      return
    }
    const scoreContainer = scoreContainerRef.current
    import(/* webpackChunkName: "abc.js" */ 'abcjs')
      .then((importedLibrary) => {
        const rendering = importedLibrary.renderAbc(scoreContainer, code, {})
        if (importedLibrary.synth.supportsAudio()) {
          const synthControls = new importedLibrary.synth.SynthController()
          synthControls.load(`#abcjs-player-${randomId}`, undefined, {
            displayPlay: true,
            displayProgress: true,
            displayLoop: true
          })
          const synthModule = new importedLibrary.synth.CreateSynth()
          synthModule
            .init({
              visualObj: rendering[0]
            })
            .then(() => synthControls.setTune(rendering[0], false))
            .then(() => {
              log.debug('abcjs audio initialized')
            })
            .catch((error) => {
              log.error('abcjs audio initialization failed:', error)
            })
        }
      })
      .catch((error: Error) => {
        log.error('Error while loading abcjs', error)
      })
  }, [code])

  return (
    <Fragment>
      <div
        ref={scoreContainerRef}
        className={`${styles['abcjs-score']} bg-white text-black svg-container`}
        {...cypressId('abcjs')}
      />
      <div id={`abcjs-player-${randomId}`}>&nbsp;</div>
    </Fragment>
  )
}
