import { Picker } from 'emoji-picker-element'
import { CustomEmoji, EmojiClickEvent, EmojiClickEventDetail } from 'emoji-picker-element/shared'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useClickAway } from 'react-use'
import { ApplicationState } from '../../../../../redux'
import { ShowIf } from '../../../../common/show-if/show-if'
import './emoji-picker.scss'
import forkawesomeIcon from './forkawesome.png'
import { ForkAwesomeIcons } from './icon-names'

export interface EmojiPickerProps {
  show: boolean
  onEmojiSelected: (emoji: EmojiClickEventDetail) => void
  onDismiss: () => void
}

export const customEmojis: CustomEmoji[] = Object.keys(ForkAwesomeIcons).map((name) => ({
  name: `fa-${name}`,
  shortcodes: [`fa-${name.toLowerCase()}`],
  url: forkawesomeIcon,
  category: 'ForkAwesome'
}))

export const EmojiPicker: React.FC<EmojiPickerProps> = ({ show, onEmojiSelected, onDismiss }) => {
  const { i18n } = useTranslation()
  const darkModeEnabled = useSelector((state: ApplicationState) => state.darkMode.darkMode)
  const pickerContainerRef = useRef<HTMLDivElement>(null)

  useClickAway(pickerContainerRef, () => {
    onDismiss()
  })

  const picker = useMemo(() => {
    return new Picker({
      locale: i18n.language,
      customEmoji: customEmojis,
      dataSource: '/static/js/emoji-data.json'
    })
  }, [i18n.language])

  const emojiClickListener = useCallback((event) => {
    onEmojiSelected((event as EmojiClickEvent).detail)
  }, [onEmojiSelected])

  const twemojiStyle = useMemo(() => {
    const style = document.createElement('style')
    style.textContent = 'section.picker { --font-family: "twemoji" !important; }'
    return style
  }, [])

  useEffect(() => {
    if (!pickerContainerRef.current) {
      return
    }
    const container = pickerContainerRef.current
    picker.addEventListener('emoji-click', emojiClickListener)
    picker.setAttribute('class', darkModeEnabled ? 'dark' : 'light')
    container.appendChild(picker)
    if (picker.shadowRoot) {
      picker.shadowRoot.appendChild(twemojiStyle)
    }
    return () => {
      picker.removeEventListener('emoji-click', emojiClickListener)
      container.removeChild(picker)
    }
  }, [onEmojiSelected, pickerContainerRef, emojiClickListener, picker, darkModeEnabled])

  // noinspection CheckTagEmptyBody
  return (
    <ShowIf condition={show}>
      <div className={'position-absolute emoji-picker-container'} ref={pickerContainerRef}></div>
    </ShowIf>
  )
}
