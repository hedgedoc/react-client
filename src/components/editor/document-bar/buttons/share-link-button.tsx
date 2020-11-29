/*
SPDX-FileCopyrightText: 2020 The HedgeDoc developers (see AUTHORS file)

SPDX-License-Identifier: AGPL-3.0-only
*/

import React, { Fragment, useCallback, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { CopyableField } from '../../../common/copyable/copyable-field/copyable-field'
import { TranslatedIconButton } from '../../../common/icon-button/translated-icon-button'
import { CommonModal } from '../../../common/modals/common-modal'
import { ShowIf } from '../../../common/show-if/show-if'

export const ShareLinkButton: React.FC = () => {
  const { t } = useTranslation()
  const [showShareDialog, setShowShareDialog] = useState(false)

  return (
    <Fragment>
      <TranslatedIconButton
        size={'sm'}
        className={'mx-1'}
        icon={'share'}
        variant={'light'}
        onClick={() => setShowShareDialog(true)} i18nKey={'editor.documentBar.shareLink'}
      />
      <CommonModal
        show={showShareDialog}
        onHide={() => setShowShareDialog(false)}
        closeButton={true}
        titleI18nKey={'editor.modal.shareLink.title'}>
        <Modal.Body>
          <Trans i18nKey={'editor.modal.shareLink.editorDescription'}/>
          <CopyableField content={'edit link'}/>
          <ShowIf condition={true}>
            <Trans i18nKey={'editor.modal.shareLink.slidesDescription'}/>
            <CopyableField content={'slides link'}/>
          </ShowIf>
          <ShowIf condition={true}>
            <Trans i18nKey={'editor.modal.shareLink.viewOnlyDescription'}/>
            <CopyableField content={'view link'}/>
          </ShowIf>
        </Modal.Body>
      </CommonModal>
    </Fragment>
  )
}
