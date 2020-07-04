import React from 'react'
import './document-bar.scss'
import { ConnectionIndicator } from '../task-bar/connection-indicator'
import { EditorMenu } from '../task-bar/editor-menu'
import { DocTimestampOwner } from './doc-timestamp-owner'
import { PermissionSelector } from './permission-selector'

export const DocumentBar: React.FC = () => {
  return (
    <div className={'document-bar bg-light px-2 py-2 d-flex flex-row align-items-center'}>
      <DocTimestampOwner/>
      <PermissionSelector/>
      <div className="text-secondary ml-auto">
        <EditorMenu/>
      </div>
      <ConnectionIndicator/>
    </div>
  )
}
