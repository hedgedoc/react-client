import React from 'react'
import { Button, ButtonProps } from 'react-bootstrap'
import { Trans } from 'react-i18next'
import { ForkAwesomeIcon, IconName } from '../fork-awesome/fork-awesome-icon'
import './icon-button.scss'
import { IconButton, IconButtonProps } from './icon-button'

export interface TranslatedIconButton extends IconButtonProps {
  i18nKey: string
}

export const TranslatedIconButton: React.FC<TranslatedIconButton> = ({ i18nKey, ...props }) => {
  return (
    <IconButton {...props}>
      <Trans i18nKey={i18nKey}/>
    </IconButton>
  )
}
