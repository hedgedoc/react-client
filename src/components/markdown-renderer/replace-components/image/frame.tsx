import React, { Fragment, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { ForkAwesomeIcon } from '../../../common/fork-awesome/fork-awesome-icon'

export const Frame: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({ alt, ...props }) => {
  const [showFullscreenImage, setShowFullscreenImage] = useState(false)

  return (
    <Fragment>
      <img alt={alt} {...props} onClick={() => setShowFullscreenImage(true)}/>
      <Modal
        animation={true}
        dialogClassName={'text-dark'}
        show={showFullscreenImage}
        onHide={() => setShowFullscreenImage(false)}
        closeButton={true}
        size={'xl'}
      >
        <Modal.Header closeButton={true} className={'flex-row'}>
          <ForkAwesomeIcon icon={'picture-o'}/>
          <span>{alt ?? ''}</span>
        </Modal.Header>
        <img alt={alt} {...props} className={'w-100'}/>
      </Modal>
    </Fragment>
  )
}
