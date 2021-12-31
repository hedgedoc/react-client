/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { Fragment, useCallback, useEffect, useMemo, useRef } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { SidebarButton } from '../sidebar-button/sidebar-button'
import { SidebarMenu } from '../sidebar-menu/sidebar-menu'
import type { SpecificSidebarMenuProps } from '../types'
import { DocumentSidebarMenuSelection } from '../types'
import { ActiveIndicatorStatus } from './active-indicator'
import styles from './online-counter.module.scss'
import { UserLine } from '../user-line/user-line'
import { useCustomizeAssetsUrl } from '../../../../hooks/common/use-customize-assets-url'
import { useApplicationState } from '../../../../hooks/common/use-application-state'

export const UsersOnlineSidebarMenu: React.FC<SpecificSidebarMenuProps> = ({
  className,
  menuId,
  onClick,
  selectedMenuId
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  useTranslation()
  const onlineUsers = useApplicationState((state) => state.awareness)

  useEffect(() => {
    const value = `${Object.keys(onlineUsers).length}`
    buttonRef.current?.style.setProperty('--users-online', `"${value}"`)
  }, [onlineUsers])

  const hide = selectedMenuId !== DocumentSidebarMenuSelection.NONE && selectedMenuId !== menuId
  const expand = selectedMenuId === menuId
  const onClickHandler = useCallback(() => {
    onClick(menuId)
  }, [menuId, onClick])

  const customizeAssetsUrl = useCustomizeAssetsUrl()

  const buttons = useMemo(
    () =>
      Object.entries(onlineUsers).map(([clientId]) => {
        return (
          <SidebarButton key={clientId}>
            <UserLine
              name={clientId}
              photo={customizeAssetsUrl + 'img/avatar.png'}
              color='red'
              status={ActiveIndicatorStatus.ACTIVE}
            />
          </SidebarButton>
        )
      }),
    [customizeAssetsUrl, onlineUsers]
  )

  return (
    <Fragment>
      <SidebarButton
        hide={hide}
        buttonRef={buttonRef}
        onClick={onClickHandler}
        icon={expand ? 'arrow-left' : 'users'}
        className={`${styles['online-entry']} ${className ?? ''}`}
        variant={'primary'}>
        <Trans i18nKey={'editor.onlineStatus.online'} />
      </SidebarButton>
      <SidebarMenu expand={expand}>{buttons}</SidebarMenu>
    </Fragment>
  )
}
