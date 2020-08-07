import moment from 'moment'
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { CopyableField } from '../../common/copyable-field/copyable-field'
import { ForkAwesomeIcon } from '../../common/fork-awesome/fork-awesome-icon'
import { CommonModal } from '../../common/modals/common-modal'
import { ConnectionIndicator } from './connection-indicator/connection-indicator'
import { DocumentTime } from './document-time'
import { EditorMenu } from './editor-menu'
import { ExportMenu } from './export-menu'
import { ImportMenu } from './import-menu'
import { PermissionSelector } from './permission-selector'

export const DocumentBar: React.FC = () => {
  useTranslation()
  const [showReadOnly, setShowReadOnly] = useState(false)

  return (
    <div className={'navbar navbar-expand navbar-light bg-light'}>
      <div className={'navbar-nav'}>
        <DocumentTime
          additionalClassNames={'pr-2'}
          createIcon={true}
          dateTime={moment(Date.now()).subtract(11, 'minutes').toDate()}
          name={'Philip Molares'}
          photo={'https://1.gravatar.com/avatar/767fc9c115a1b989744c755db47feb60?s=200&r=pg&d=mp'}
        />
        <DocumentTime
          additionalClassNames={'px-2'}
          createIcon={false}
          dateTime={moment(Date.now()).subtract(3, 'minutes').toDate()}
          name={'Tilman Vatteroth'}
          photo={'https://1.gravatar.com/avatar/767fc9c115a1b989744c755db47feb60?s=200&r=pg&d=mp'}
        />
      </div>
      <div className="ml-auto navbar-nav">
        <PermissionSelector/>
        <Button variant={'light'} className={'mx-1'} size={'sm'}>
          <ForkAwesomeIcon icon={'history'} className={'mx-1'}/>
          <Trans i18nKey={'editor.menu.revision'}/>
        </Button>
        <Button variant={'light'} className={'mx-1'} size={'sm'} onClick={() => setShowReadOnly(true)}>
          <ForkAwesomeIcon icon={'share'} className={'mx-1'}/>
          <Trans i18nKey={'editor.menu.publish'}/>
        </Button>
        <ImportMenu/>
        <ExportMenu/>
        <EditorMenu/>
        <ConnectionIndicator/>
      </div>
      <CommonModal
        show={showReadOnly}
        onHide={() => setShowReadOnly(false)}
        titleI18nKey={'editor.menu.publish'}>
        <div className={'mx-4 d-flex flex-column justify-items-between'}>
          <span className={'my-4'}><Trans i18nKey={'editor.menu.publishText'}/></span>
          <CopyableField content={'https://example.com'}/>
        </div>
      </CommonModal>
    </div>
  )
}
