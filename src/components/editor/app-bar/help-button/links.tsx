import React from 'react'
import { Card, Col } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { TranslatedExternalLink } from '../../../common/links/translated-external-link'

export const Links: React.FC = () => {
  useTranslation()
  return (
    <Col lg={4}>
      <Card>
        <Card.Header><Trans i18nKey='editor.help.contacts.title'/></Card.Header>
        <Card.Body>
          <Card.Text>
            <ul className="list-unstyled">
              <li>
                <TranslatedExternalLink
                  i18nKey='editor.help.contacts.community'
                  href='https://community.codimd.org/'
                  icon='users'
                  className='text-primary'
                />
              </li>
              <li>
                <TranslatedExternalLink
                  i18nKey='editor.help.contacts.meetUsOn'
                  i18nOption={{ service: 'Matrix' }}
                  href='https://riot.im/app/#/room/#codimd:matrix.org'
                  icon='hashtag'
                  className='text-primary'
                />
              </li>
              <li>
                <TranslatedExternalLink
                  i18nKey='editor.help.contacts.reportIssue'
                  href='https://github.com/codimd/server/issues'
                  icon='tag'
                  className='text-primary'
                />
              </li>
              <li>
                <TranslatedExternalLink
                  i18nKey='editor.help.contacts.helpTranslating'
                  href='https://translate.codimd.org/'
                  icon='language'
                  className='text-primary'
                />
              </li>
            </ul>
          </Card.Text>
        </Card.Body>
      </Card>
      <br/>
      <Card>
        <Card.Header><Trans i18nKey='editor.help.documents.title'/></Card.Header>
        <Card.Body>
          <Card.Text>
            <ul className="list-unstyled">
              <li>
                <TranslatedExternalLink
                  i18nKey='editor.help.documents.features'
                  href='/n/features'
                  icon='dot-circle-o'
                  className='text-primary'
                />
              </li>
              <li>
                <TranslatedExternalLink
                  i18nKey='editor.help.documents.yamlMetadata'
                  href='/n/yaml-data'
                  icon='dot-circle-o'
                  className='text-primary'
                />
              </li>
              <li>
                <TranslatedExternalLink
                  i18nKey='editor.help.documents.slideExample'
                  href='https://github.com/codimd/server/issues'
                  icon='dot-circle-o'
                  className='text-primary'
                />
              </li>
            </ul>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  )
}
