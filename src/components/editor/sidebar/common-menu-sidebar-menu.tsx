/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { Fragment } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { DeleteNoteSidebarEntry } from './delete-note-sidebar-entry'
import { PinNoteSidebarEntry } from './pin-note-sidebar-entry'
import { SidebarButton } from './sidebar-button'
import { SidebarMenu } from './sidebar-menu'
import { SidebarMenuProps, SpecificSidebarEntryProps } from './types'

export const CommonMenuSidebarMenu: React.FC<SpecificSidebarEntryProps & SidebarMenuProps> = ({className, hide, onClick, expand}) => {
  useTranslation()

  return (
    <Fragment>
      <SidebarButton hide={hide} icon={expand ? "arrow-left" : "bars"} className={className} onClick={onClick}>
        <Trans i18nKey={'editor.documentBar.menu'} />
      </SidebarButton>
      <SidebarMenu expand={expand}>
        <DeleteNoteSidebarEntry/>
        <PinNoteSidebarEntry/>
      </SidebarMenu>
    </Fragment>
  );
}
