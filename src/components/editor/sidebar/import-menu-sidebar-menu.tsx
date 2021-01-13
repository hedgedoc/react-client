/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { Fragment } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { ImportMarkdownSidebarEntry } from './import-markdown-sidebar-entry'
import { SidebarButton } from './sidebar-button'
import { SidebarMenu } from './sidebar-menu'
import { SidebarMenuProps, SpecificSidebarEntryProps } from './types'

export const ImportMenuSidebarMenu: React.FC<SpecificSidebarEntryProps & SidebarMenuProps> = ({className, hide, onClick, expand}) => {

  useTranslation()

    return (
      <Fragment>
        <SidebarButton data-cy={"menu-import"} hide={hide} icon={expand ? "arrow-left" : "cloud-upload"} className={className} onClick={onClick}>
          <Trans i18nKey={'editor.documentBar.import'}/>
        </SidebarButton>
        <SidebarMenu expand={expand}>
          <SidebarButton icon={"github"}>
            Gist
          </SidebarButton>
          <SidebarButton icon={"gitlab"}>
            Gitlab Snippet
          </SidebarButton>
          <SidebarButton icon={"clipboard"}>
            <Trans i18nKey={'editor.import.clipboard'}/>
          </SidebarButton>
          <ImportMarkdownSidebarEntry/>
        </SidebarMenu>
      </Fragment>
    );
}
