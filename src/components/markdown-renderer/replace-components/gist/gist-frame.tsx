/*
 SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)

 SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useEffect, useState } from 'react'
import './gist-frame.scss'
import { HighlightedCode } from '../highlighted-fence/highlighted-code/highlighted-code'
import { Logger } from '../../../../utils/logger'
import { ForkAwesomeIcon } from '../../../common/fork-awesome/fork-awesome-icon'

export interface GistFrameProps {
  id: string
}

const log = new Logger('Gist Embedding')

/**
 * This component renders a GitHub Gist by fetching the content from the API.
 *
 * @param id The id of the gist
 */
export const GistFrame: React.FC<GistFrameProps> = ({ id }) => {
  const [code, setCode] = useState<string | undefined>(undefined)

  useEffect(() => {
    fetch(`https://gist.githubusercontent.com/${id}/raw`)
      .then((response) => response.text())
      .then((value) => setCode(value))
      .catch((error) => log.error(`Error while loading gist ${id}`, error))
  })

  if (!code) {
    return <ForkAwesomeIcon fixedWidth={true} className={'fa-spin'} icon={'spinner'} />
  } else {
    return <span data-cy={'gh-gist'}>
      <HighlightedCode code={code} startLineNumber={1} wrapLines={false}/>
    </span>
  }
}
