import React, { Fragment, useCallback, useRef, useState } from 'react'
import { Button, Overlay, Tooltip } from 'react-bootstrap'
import { Variant } from 'react-bootstrap/types'
import { Trans, useTranslation } from 'react-i18next'
import { ForkAwesomeIcon } from '../fork-awesome/fork-awesome-icon'

export interface CopyToClipboardButtonProps {
  content: string
  size?: 'sm' | 'lg'
  variant?: Variant
}

export const CopyToClipboardButton: React.FC<CopyToClipboardButtonProps> = ({ content, size = 'sm', variant = 'dark' }) => {
  const { t } = useTranslation()
  const button = useRef<HTMLButtonElement>(null)
  const [showCopiedTooltip, setShowCopiedTooltip] = useState(false)

  const copyToClipboard = useCallback((content: string) => {
    navigator.clipboard.writeText(content).then(() => {
      setShowCopiedTooltip(true)
      setTimeout(() => { setShowCopiedTooltip(false) }, 2000)
    }).catch(() => {
      console.error("couldn't copy")
    })
  }, [])

  return (
    <Fragment>
      <Overlay target={button} show={showCopiedTooltip} placement="top">
        {(props) => (
          <Tooltip id={'copied_' + content} {...props}>
            <Trans i18nKey={'common.successfullyCopied'}/>
          </Tooltip>
        )}
      </Overlay>
      <Button ref={button} onClick={() => copyToClipboard(content)} size={size} variant={variant} title={t('renderer.highlightCode.copyCode')}>
        <ForkAwesomeIcon icon='files-o'/>
      </Button>
    </Fragment>
  )
}
