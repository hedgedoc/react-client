import React, { Fragment, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Trans } from 'react-i18next'
import { CopyableField } from '../../common/copyable-field/copyable-field'
import { ForkAwesomeIcon } from '../../common/fork-awesome/fork-awesome-icon'
import { CommonModal } from '../../common/modals/common-modal'

export const ShareButton: React.FC = () => {
  const [showReadOnly, setShowReadOnly] = useState(false)

  return (
    <Fragment>
      <Button variant={'light'} className={'mx-1'} size={'sm'} onClick={() => setShowReadOnly(true)}>
        <ForkAwesomeIcon icon={'share'} className={'mx-1'}/>
        <Trans i18nKey={'editor.menu.share'}/>
      </Button>
      <CommonModal
        show={showReadOnly}
        onHide={() => setShowReadOnly(false)}
        closeButton={true}
        titleI18nKey={'editor.menu.share'}>
        <div className={'mx-4 d-flex flex-column justify-items-between'}>
          <span className={'my-4'}><Trans i18nKey={'editor.menu.shareText'}/></span>
          <CopyableField content={'https://example.com'}/>
        </div>
      </CommonModal>
    </Fragment>
  )
}
