/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { TocAst } from 'markdown-it-toc-done-right'
import React, { useCallback, useRef, useState } from 'react'
import { useClickAway } from 'react-use'
import { CommonMenuSidebarMenu } from './common-menu-sidebar-menu'
import { DocumentInfoSidebarEntry } from './document-info-sidebar-entry'
import { ExportMenuSidebarMenu } from './export-menu-sidebar-menu'
import { ImportMenuSidebarMenu } from './import-menu-sidebar-menu'
import { PermissionsSidebarEntry } from './permissions-sidebar-entry'
import { RevisionSidebarEntry } from './revision-sidebar-entry'
import { ShareSidebarEntry } from './share-sidebar-entry'
import "./style/theme.scss"
import { UsersOnlineSidebarMenu } from './users-online-sidebar-menu/users-online-sidebar-menu'

export enum DocumentSidebarMenuSelection {
  NONE,
  USERS_ONLINE,
  IMPORT,
  EXPORT,
  TOC,
  COMMON
}

export interface SidebarProps {
  tocAst?: TocAst
}

export const Sidebar: React.FC<SidebarProps> = ({tocAst}) => {

  const sideBarRef = useRef<HTMLDivElement>(null);
  const [selectedMenu, setSelectedMenu] = useState<DocumentSidebarMenuSelection>(DocumentSidebarMenuSelection.NONE)

  useClickAway(sideBarRef, () => {
    setSelectedMenu(DocumentSidebarMenuSelection.NONE);
  })

  const toggleValue = useCallback( (toggleValue:DocumentSidebarMenuSelection): ()=>void => {
    return () => {
    const newValue = selectedMenu === toggleValue ? DocumentSidebarMenuSelection.NONE : toggleValue
    setSelectedMenu(newValue);
    }
  },[selectedMenu]);

  const selectionIsNotNone = selectedMenu  !== DocumentSidebarMenuSelection.NONE

  return (
    <div className="slide-sidebar">
      <div ref={sideBarRef} className={`sidebar-inner ${selectionIsNotNone ? 'show' : ''}`}>
        <UsersOnlineSidebarMenu expand={selectedMenu === DocumentSidebarMenuSelection.USERS_ONLINE}
                                hide={selectionIsNotNone && selectedMenu !== DocumentSidebarMenuSelection.USERS_ONLINE }
                                onClick={toggleValue(DocumentSidebarMenuSelection.USERS_ONLINE)}/>
        <DocumentInfoSidebarEntry hide={selectionIsNotNone}/>
        <RevisionSidebarEntry hide={selectionIsNotNone}/>
        <PermissionsSidebarEntry hide={selectionIsNotNone}/>
        <ImportMenuSidebarMenu expand={selectedMenu === DocumentSidebarMenuSelection.IMPORT}
                               hide={selectionIsNotNone && selectedMenu !== DocumentSidebarMenuSelection.IMPORT}
                               onClick={toggleValue(DocumentSidebarMenuSelection.IMPORT)}/>
        <ExportMenuSidebarMenu expand={selectedMenu === DocumentSidebarMenuSelection.EXPORT}
                               hide={selectionIsNotNone && selectedMenu !== DocumentSidebarMenuSelection.EXPORT}
                               onClick={toggleValue(DocumentSidebarMenuSelection.EXPORT)}/>
        <ShareSidebarEntry hide={selectionIsNotNone}/>
        <CommonMenuSidebarMenu expand={selectedMenu === DocumentSidebarMenuSelection.COMMON}
                                    hide={selectionIsNotNone && selectedMenu !== DocumentSidebarMenuSelection.COMMON}
                                    onClick={toggleValue(DocumentSidebarMenuSelection.COMMON)}/>
      </div>
    </div>
  )
}
