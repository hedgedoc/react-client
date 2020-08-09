import React from 'react'
import { Button } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { ForkAwesomeIcon } from '../../common/fork-awesome/fork-awesome-icon'
import { ConnectionIndicator } from './connection-indicator/connection-indicator'
import { DocumentInfo } from './document-info'
import { EditorMenu } from './editor-menu'
import { ExportMenu } from './export-menu'
import { ImportMenu } from './import-menu'
import { PermissionButton } from './permission-button'
import { PinToHistoryButton } from './pin-to-history-button'
import { ShareButton } from './share-button'

export interface DocumentBarProps {
  title: string
}

export const DocumentBar: React.FC<DocumentBarProps> = ({ title }) => {
  useTranslation()

  return (
    <div className={'navbar navbar-expand navbar-light bg-light'}>
      <ShareButton/>
      <DocumentInfo/>
      <Button variant={'light'} className={'mx-1'} size={'sm'}>
        <ForkAwesomeIcon icon={'history'} className={'mx-1'}/>
        <Trans i18nKey={'editor.menu.revision'}/>
      </Button>
      <PinToHistoryButton/>
      <PermissionButton/>
      <div className="ml-auto navbar-nav">
        <ImportMenu/>
        <ExportMenu/>
        <EditorMenu noteTitle={title}/>
        <ConnectionIndicator/>
      </div>
    </div>
  )
}
