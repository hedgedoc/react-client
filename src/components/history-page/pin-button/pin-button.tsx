import React from 'react'
import { Button } from 'react-bootstrap'
import { ForkAwesomeIcon } from '../../common/fork-awesome/fork-awesome-icon'
import './pin-button.scss'

export interface PinButtonProps {
  isPinned: boolean;
  onPinClick: () => void;
  isDark: boolean;
  className?: string
  historyStyle?: boolean
}

export const PinButton: React.FC<PinButtonProps> = ({ isPinned, onPinClick, isDark, className, historyStyle = true, children }) => {
  return (
    <Button
      variant={isDark ? 'secondary' : 'light'}
      size={historyStyle ? 'lg' : 'sm'}
      className={`${historyStyle ? 'history-pin' : ''} ${className || ''} ${isPinned ? 'pinned' : ''} pin`}
      onClick={onPinClick}
    >
      <ForkAwesomeIcon icon="thumb-tack"/>
      {children}
    </Button>
  )
}
