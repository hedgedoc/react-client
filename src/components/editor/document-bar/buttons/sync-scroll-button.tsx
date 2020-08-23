import React, { useCallback } from 'react'
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../../../../redux'
import { setEditorSyncScroll } from '../../../../redux/editor/methods'
import { ForkAwesomeIcon } from '../../../common/fork-awesome/fork-awesome-icon'

export const SyncScrollButton: React.FC = () => {
  const syncScroll: boolean = useSelector((state: ApplicationState) => state.editorConfig.syncScroll)
  const translation = syncScroll ? 'editor.documentBar.disableSyncScroll' : 'editor.documentBar.enableSyncScroll'
  const iconColor = syncScroll ? '' : 'text-muted'
  const onClick = useCallback(() => {
    setEditorSyncScroll(!syncScroll)
  }, [syncScroll])

  useTranslation()

  return (
    <ToggleButtonGroup type="checkbox" defaultValue={[]} name="dark-mode" className="ml-2" value={[syncScroll]}>
      <ToggleButton
        title={ translation }
        variant={ 'light' }
        onChange={onClick} value={false}
        className={'pl-2'}
      >
        <ForkAwesomeIcon icon={'refresh'} fixedWidth={true} className={iconColor}/>
        <Trans i18nKey={translation}/>
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
