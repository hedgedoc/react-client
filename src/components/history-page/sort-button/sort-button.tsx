import React from 'react'
import { ButtonProps } from 'react-bootstrap'
import { IconName } from '../../common/fork-awesome/types'
import { IconButton } from '../../common/icon-button/icon-button'

export enum SortModeEnum {
    up = 1,
    down = -1,
    no = 0
}

const getIcon = (direction: SortModeEnum): IconName => {
  switch (direction) {
    default:
    case SortModeEnum.no:
      return 'sort'
    case SortModeEnum.up:
      return 'sort-asc'
    case SortModeEnum.down:
      return 'sort-desc'
  }
}

export interface SortButtonProps extends ButtonProps {
    onDirectionChange: (direction: SortModeEnum) => void
    direction: SortModeEnum
}

const toggleDirection = (direction: SortModeEnum) => {
  switch (direction) {
    case SortModeEnum.no:
      return SortModeEnum.up
    case SortModeEnum.up:
      return SortModeEnum.down
    default:
    case SortModeEnum.down:
      return SortModeEnum.no
  }
}

export const SortButton: React.FC<SortButtonProps> = ({ children, variant, onDirectionChange, direction }) => {
  const toggleSort = () => {
    onDirectionChange(toggleDirection(direction))
  }

  return <IconButton onClick={toggleSort} variant={variant} icon={getIcon(direction)} border={true}>{children}</IconButton>
}
