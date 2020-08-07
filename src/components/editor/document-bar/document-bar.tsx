import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { CopyableField } from '../../common/copyable-field/copyable-field'
import { ForkAwesomeIcon } from '../../common/fork-awesome/fork-awesome-icon'
import { CommonModal } from '../../common/modals/common-modal'
import { ConnectionIndicator } from './connection-indicator/connection-indicator'
import { DocumentInfo } from './document-info'
import { EditorMenu } from './editor-menu'
import { ExportMenu } from './export-menu'
import { ImportMenu } from './import-menu'
import { PermissionSelector } from './permission-selector'

export const DocumentBar: React.FC = () => {
  useTranslation()
  const [showReadOnly, setShowReadOnly] = useState(false)

  return (
    <div className={'navbar navbar-expand navbar-light bg-light'}>
      <div className="ml-auto navbar-nav">
        <DocumentInfo/>
        <PermissionSelector/>
        <Button variant={'light'} className={'mx-1'} size={'sm'}>
          <ForkAwesomeIcon icon={'history'} className={'mx-1'}/>
          <Trans i18nKey={'editor.menu.revision'}/>
        </Button>
        <Button variant={'light'} className={'mx-1'} size={'sm'} onClick={() => setShowReadOnly(true)}>
          <ForkAwesomeIcon icon={'share'} className={'mx-1'}/>
          <Trans i18nKey={'editor.menu.share'}/>
        </Button>
        <ImportMenu/>
        <ExportMenu/>
        <EditorMenu/>
        <ConnectionIndicator/>
      </div>
      <CommonModal
        show={showReadOnly}
        onHide={() => setShowReadOnly(false)}
        closeButton={true}
        titleI18nKey={'editor.menu.publish'}>
        <div className={'mx-4 d-flex flex-column justify-items-between'}>
          <span className={'my-4'}><Trans i18nKey={'editor.menu.publishText'}/></span>
          <CopyableField content={'https://example.com'}/>
        </div>
      </CommonModal>
    </div>
  )
}
