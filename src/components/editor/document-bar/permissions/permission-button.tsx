import React, { Fragment, useState } from 'react'
import { TranslatedIconButton } from '../../../common/icon-button/translated-icon-button'
import { PermissionModal } from './permission-modal'

export const PermissionButton: React.FC = () => {
  const [showReadOnly, setShowReadOnly] = useState(false)

  return (
    <Fragment>
      <TranslatedIconButton size={'sm'} className={'mx-1'} icon={'lock'} variant={'light'} onClick={() => setShowReadOnly(true)} i18nKey={'editor.documentBar.permissions'}/>
      <PermissionModal show={showReadOnly} onChangeShow={setShowReadOnly}/>
    </Fragment>
  )
}
