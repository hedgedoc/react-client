import React, { useEffect, useState } from 'react'
import { IconName } from '../../../../common/fork-awesome/fork-awesome-icon'
import { ShowIf } from '../../../../common/show-if/show-if'
import './one-click-embedding.scss'

interface OneClickFrameProps {
  onImageFetch?: () => Promise<string>
  loadingImageUrl: string
  hoverIcon?: IconName
  embedResponsive?: '1by1' | '4by3' | '16by9' | '21by9'
}

export const OneClickEmbedding: React.FC<OneClickFrameProps> = ({ onImageFetch, loadingImageUrl, children, hoverIcon, embedResponsive }) => {
  const [showFrame, setShowFrame] = useState(false)
  const [previewImageLink, setPreviewImageLink] = useState<string>(loadingImageUrl)

  const showChildren = () => {
    setShowFrame(true)
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
    <span className={embedResponsive ? `embed-responsive embed-responsive-${embedResponsive}` : ''}>
      <ShowIf condition={showFrame}>
        {children}
      </ShowIf>
      <ShowIf condition={!showFrame}>
        <span className={`one-click-embedding ${embedResponsive ? 'embed-responsive-item' : ''}`} onClick={showChildren}>
          <img src={previewImageLink} alt={`preview of ${previewImageLink}`}/>
          <ShowIf condition={!!hoverIcon}>
            <i className={`fa fa-${hoverIcon as string} fa-5x`}/>
          </ShowIf>
        </span>
      </ShowIf>
    </span>
  )
}
