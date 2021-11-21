/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import links from '../../../../links.json'
import { TranslatedExternalLink } from '../../../common/links/translated-external-link'
import { TranslatedInternalLink } from '../../../common/links/translated-internal-link'

export const LinksTabContent: React.FC = () => {
  useTranslation()

  return (
    <Row className={'justify-content-center pt-4'}>
      <Col lg={4}>
        <h3>
          <Trans i18nKey='editor.help.contacts.title' />
        </h3>
        <div>
          <ul className='list-unstyled'>
            <li>
              <TranslatedExternalLink
                i18nKey='editor.help.contacts.community'
                href={links.community}
                icon='users'
                className='text-primary'
              />
            </li>
            <li>
              <TranslatedExternalLink
                i18nKey='editor.help.contacts.meetUsOn'
                i18nOption={{ service: 'Matrix' }}
                href={links.chat}
                icon='hashtag'
                className='text-primary'
              />
            </li>
            <li>
              <TranslatedExternalLink
                i18nKey='editor.help.contacts.reportIssue'
                href={links.backendIssues}
                icon='tag'
                className='text-primary'
              />
            </li>
            <li>
              <TranslatedExternalLink
                i18nKey='editor.help.contacts.helpTranslating'
                href={links.translate}
                icon='language'
                className='text-primary'
              />
            </li>
          </ul>
        </div>
      </Col>
      <Col lg={4}>
        <h3>
          <Trans i18nKey='editor.help.documents.title' />
        </h3>
        <div>
          <ul className='list-unstyled'>
            <li>
              <TranslatedInternalLink
                i18nKey='editor.help.documents.features'
                href='/n/features'
                icon='dot-circle-o'
                className='text-primary'
              />
            </li>
            <li>
              <TranslatedInternalLink
                i18nKey='editor.help.documents.yamlMetadata'
                href='/n/yaml-metadata'
                icon='dot-circle-o'
                className='text-primary'
              />
            </li>
            <li>
              <TranslatedInternalLink
                i18nKey='editor.help.documents.slideExample'
                href='/n/slide-example'
                icon='dot-circle-o'
                className='text-primary'
              />
            </li>
          </ul>
        </div>
      </Col>
    </Row>
  )
}
