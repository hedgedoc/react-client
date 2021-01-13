/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react'
import { Alert } from 'react-bootstrap'
import { Trans } from 'react-i18next'
import links from '../../../links.json'
import { TranslatedExternalLink } from '../../common/links/translated-external-link'

export interface YamlArrayDeprecationAlertProps {
  show: boolean
}

export const YamlArrayDeprecationAlert: React.FC<YamlArrayDeprecationAlertProps> = ({ show }) => {
  return !show ? null : (
    <Alert data-cy={'yamlArrayDeprecationAlert'} variant='warning' dir='auto'>
      <Trans i18nKey='editor.deprecatedTags'/>
      <br/>
      <TranslatedExternalLink i18nKey={'common.readForMoreInfo'} href={links.faq} className={'text-primary'}/>
    </Alert>
  )
}
