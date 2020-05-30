import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { Trans } from 'react-i18next'
import { getBackendUrl } from '../../../../../utils/apiUtils'

export const ProfileAdvancedOptions: React.FC = () => {
  return (
    <Card className="bg-dark mb-4">
      <Card.Body>
        <Card.Title><Trans i18nKey="advancedAccountOptions"/></Card.Title>
        <Button variant="secondary" block href={getBackendUrl() + '/me/export'} className="mb-2">
          <FontAwesomeIcon icon="cloud-download-alt" fixedWidth={true} className="mr-2" />
          <Trans i18nKey="exportAccountData"/>
        </Button>
        <Button variant="danger" block>
          <FontAwesomeIcon icon="trash" fixedWidth={true} className="mr-2" />
          <Trans i18nKey="deleteAccount"/>
        </Button>
      </Card.Body>
    </Card>
  )
}
