/*
 SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)

 SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback } from 'react'
import { cypressId } from '../../../../utils/cypress-attribute'
import './gist-frame.scss'
import { useResizeGistFrame } from './use-resize-gist-frame'
import { ClickShield } from '../click-shield/click-shield'
import type { IdProps } from '../custom-tag-with-id-component-replacer'

/**
 * This component renders a GitHub Gist by placing the gist URL in an {@link HTMLIFrameElement iframe}.
 *
 * @param id The id of the gist
 */
export const GistFrame: React.FC<IdProps> = ({ id }) => {
  const [frameHeight, onStartResizing] = useResizeGistFrame(150)

  const onStart = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      onStartResizing(event)
    },
    [onStartResizing]
  )

  return (
    <ClickShield
      fallbackBackgroundColor={'#161b22'}
      hoverIcon={'github'}
      targetDescription={'GitHub Gist'}
      data-cypress-id={'click-shield-gist'}>
      <iframe
        sandbox=''
        {...cypressId('gh-gist')}
        width='100%'
        height={`${frameHeight}px`}
        frameBorder='0'
        title={`gist ${id}`}
        src={`https://gist.github.com/${id}.pibb`}
      />
      <span className={'gist-resizer-row'}>
        <span className={'gist-resizer'} onMouseDown={onStart} onTouchStart={onStart} />
      </span>
    </ClickShield>
  )
}
