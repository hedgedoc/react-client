import React, { useEffect, useState } from 'react'
import { Trans } from 'react-i18next'
import { IconName } from '../../../../common/fork-awesome/fork-awesome-icon'
import { ShowIf } from '../../../../common/show-if/show-if'
import './one-click-embedding.scss'

interface OneClickFrameProps {
  onImageFetch?: () => Promise<string>
  loadingImageUrl: string
  hoverIcon?: IconName
  hoverTextLocalized?: string
  tooltip?: string
  containerClassName?: string
  previewContainerClassName?: string
  onActivate?: () => void
}

}

export const OneClickEmbedding: React.FC<OneClickFrameProps> = ({ previewContainerClassName, containerClassName, onImageFetch, loadingImageUrl, children, tooltip, hoverIcon, hoverTextLocalized, onActivate }) => {
  const [showFrame, setShowFrame] = useState(false)
  const [previewImageLink, setPreviewImageLink] = useState<string>(loadingImageUrl)

  const showChildren = () => {
    setShowFrame(true)
    if (onActivate) {
      onActivate()
    }
  }

  useEffect(() => {
    if (!onImageFetch) {
      return
    }
    onImageFetch().then((imageLink) => {
      setPreviewImageLink(imageLink)
    }).catch((message) => {
      console.error(message)
    })
  }, [onImageFetch])

  return (
    <span className={ containerClassName }>
      <ShowIf condition={showFrame}>
        {children}
      </ShowIf>
      <ShowIf condition={!showFrame}>
        <span className={`one-click-embedding ${previewContainerClassName || ''}`} onClick={showChildren}>
          <img className={'one-click-embedding-preview'} src={previewImageLink} alt={tooltip || ''} title={tooltip || ''}/>
          <ShowIf condition={!!hoverIcon}>
            <span className='one-click-embedding-icon text-center'>
              <i className={`fa fa-${hoverIcon as string} fa-5x mb-2`} />
              <ShowIf condition={hoverTextLocalized !== undefined}>
                <br />
                <Trans i18nKey={hoverTextLocalized} />
              </ShowIf>
            </span>
          </ShowIf>
        </span>
      </ShowIf>
    </span>
  )
}
