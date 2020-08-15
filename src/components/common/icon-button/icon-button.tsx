import React from 'react'
import { Button, ButtonProps } from 'react-bootstrap'
import { ForkAwesomeIcon, IconName } from '../fork-awesome/fork-awesome-icon'
import './icon-button.scss'

export interface IconButtonProps extends ButtonProps {
  icon: IconName
  onClick?: () => void
  border?: boolean
}

export const IconButton: React.FC<IconButtonProps> = ({ icon, children, variant, onClick, border = false }) => {
  return (
    <Button variant={variant} className={`btn-icon p-0 d-inline-flex align-items-stretch ${border ? 'with-border' : ''}`}
      onClick={() => onClick?.()}>
      <span className="icon-part d-flex align-items-center">
        <ForkAwesomeIcon icon={icon} className={'icon'}/>
      </span>
      <span className="text-part d-flex align-items-center">
        {children}
      </span>
    </Button>
  )
}
