/*
SPDX-FileCopyrightText: 2020 The HedgeDoc developers (see AUTHORS file)

SPDX-License-Identifier: AGPL-3.0-only
*/

import equal from 'fast-deep-equal'
import React, { Fragment, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../../../../redux'
import { CopyableField } from '../../../common/copyable/copyable-field/copyable-field'
import { TranslatedIconButton } from '../../../common/icon-button/translated-icon-button'
import { CommonModal } from '../../../common/modals/common-modal'
import { ShowIf } from '../../../common/show-if/show-if'

export const ShareLinkButton: React.FC = () => {
  useTranslation()
  const [showShareDialog, setShowShareDialog] = useState(false)
  const noteMetadata = useSelector((state: ApplicationState) => state.documentContent.metadata, equal)

  return (
    <Fragment>
      <TranslatedIconButton
        size={'sm'}
        className={'mx-1'}
        icon={'share'}
        variant={'light'}
        onClick={() => setShowShareDialog(true)}
        i18nKey={'editor.documentBar.shareLink'}
      />
      <CommonModal
        show={showShareDialog}
        onHide={() => setShowShareDialog(false)}
        closeButton={true}
        titleI18nKey={'editor.modal.shareLink.title'}>
        <Modal.Body>
          <Trans i18nKey={'editor.modal.shareLink.editorDescription'}/>
          <CopyableField content={'edit link'} nativeShareButton={true} url={''}/>
          <ShowIf condition={noteMetadata.type === 'slide'}>
            <Trans i18nKey={'editor.modal.shareLink.slidesDescription'}/>
            <CopyableField content={'slides link'} nativeShareButton={true} url={''}/>
          </ShowIf>
          <ShowIf condition={noteMetadata.type === ''}>
            <Trans i18nKey={'editor.modal.shareLink.viewOnlyDescription'}/>
            <CopyableField content={'view link'} nativeShareButton={true} url={''}/>
          </ShowIf>
        </Modal.Body>
      </CommonModal>
    </Fragment>
  )
}
