import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../../../../redux'
import { setEditorSyncScroll } from '../../../../redux/editor/methods'
import { TranslatedIconButton } from '../../../common/icon-button/translated-icon-button'

export const SyncScrollButton: React.FC = () => {
  const syncScroll: boolean = useSelector((state: ApplicationState) => state.editorConfig.syncScroll)
  const translation = syncScroll ? 'editor.documentBar.disableSyncScroll' : 'editor.documentBar.enableSyncScroll'
  const icon = syncScroll ? 'chain-broken' : 'link'
  const onClick = useCallback(() => {
    setEditorSyncScroll(!syncScroll)
  }, [syncScroll])

  return (
    <TranslatedIconButton size={'sm'} className={'mx-1'} icon={icon} variant={'light'} onClick={onClick} i18nKey={translation}/>
  )
}
