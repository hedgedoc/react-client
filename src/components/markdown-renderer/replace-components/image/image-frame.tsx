import React, { Fragment, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getProxiedUrl } from '../../../../api/media'
import { ApplicationState } from '../../../../redux'
import { ForkAwesomeIcon } from '../../../common/fork-awesome/fork-awesome-icon'
import { CommonModal } from '../../../common/modals/common-modal'

export const ImageFrame: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({ src, title, ...props }) => {
  const [imageUrl, setImageUrl] = useState('')
  const imageProxyEnabled = useSelector((state: ApplicationState) => state.config.useImageProxy)

  useEffect(() => {
    if (!imageProxyEnabled || !src) {
      return
    }
    getProxiedUrl(src)
      .then(proxyResponse => setImageUrl(proxyResponse.src))
      .catch(err => console.error(err))
  }, [imageProxyEnabled, src])

  if (imageProxyEnabled) {
    return (
      <Frame src={imageUrl} title={title ?? ''} {...props}/>
    )
  }

  return (
    <Frame src={src ?? ''} title={title ?? ''} {...props}/>
  )
}

const Frame: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({ alt, ...props }) => {
  const { t } = useTranslation()
  const [showFullscreenImage, setShowFullscreenImage] = useState(false)

  return (
    <Fragment>
      <img alt={alt} {...props}/>
      <div className={'text-right'} style={{ marginTop: '-31px' }}>
        <Button size={'sm'} variant={'dark'} onClick={() => setShowFullscreenImage(true)} title={t('renderer.image.expandImage')}>
          <ForkAwesomeIcon icon={'expand'}/>
        </Button>
      </div>
      <CommonModal
        show={showFullscreenImage}
        onHide={() => setShowFullscreenImage(false)}
        title={alt ?? ''}
        closeButton={true}
        size={'xl'}
        icon={'picture-o'}
      >
        <Modal.Body>
          <img alt={alt} {...props} className={'w-100'}/>
        </Modal.Body>
      </CommonModal>
    </Fragment>
  )
}
