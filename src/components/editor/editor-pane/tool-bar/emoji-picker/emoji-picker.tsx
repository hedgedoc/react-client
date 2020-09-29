import { Picker } from 'emoji-picker-element'
import { CustomEmoji, EmojiClickEvent, EmojiClickEventDetail } from 'emoji-picker-element/shared'
import React, { useEffect, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useClickAway } from 'react-use'
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
  const pickerRef = useRef<HTMLDivElement>(null)

  useClickAway(pickerRef, () => {
    onDismiss()
  })

  const picker = useMemo(() => {
    return new Picker({
      locale: i18n.language,
      customEmoji: customEmojis
    })
  }, [i18n])

  useEffect(() => {
    if (!pickerRef.current) {
      return
    }
    picker.addEventListener('emoji-click', event => onEmojiSelected(event.detail))
    pickerRef.current.appendChild(picker)
    return () => {
      picker.removeEventListener('emoji-click', event => onEmojiSelected((event as EmojiClickEvent).detail))
    }
  }, [picker, onEmojiSelected, pickerRef])

  // noinspection CheckTagEmptyBody
  return (
    <ShowIf condition={show}>
      <div className={'position-relative'} ref={pickerRef}></div>
    </ShowIf>
  )
}
