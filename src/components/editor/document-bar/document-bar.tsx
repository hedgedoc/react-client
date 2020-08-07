import React from 'react'
import { Button } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { ForkAwesomeIcon } from '../../common/fork-awesome/fork-awesome-icon'
import { ConnectionIndicator } from './connection-indicator/connection-indicator'
import { DocTimestamps } from './doc-timestamps'
import { EditorImportExportMenu } from './editor-import-export-menu'
import { EditorMenu } from './editor-menu'
import { PermissionSelector } from './permission-selector'

export const DocumentBar: React.FC = () => {
  useTranslation()

  return (
    <div className={'navbar navbar-expand navbar-light bg-light'}>
      <DocTimestamps/>
      <PermissionSelector/>
      <div className="ml-auto navbar-nav">
        <Button variant={'light'} className={'mx-1'} size={'sm'}>
          <ForkAwesomeIcon icon={'history'} className={'mx-1'}/>
          <Trans i18nKey={'editor.menu.revision'}/>
        </Button>
        <EditorImportExportMenu/>
        <EditorMenu/>
        <ConnectionIndicator/>
      </div>
    </div>
  )
}
