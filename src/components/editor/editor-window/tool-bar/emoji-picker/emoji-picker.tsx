import { Data, EmojiData, NimblePicker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import emojiData from 'emoji-mart/data/twitter.json'
import React, { useRef } from 'react'
import { useClickAway } from 'react-use'
import { ShowIf } from '../../../../common/show-if/show-if'
import './emoji-picker.scss'
import { ForkAwesomeIcons } from './icon-names'

export interface EmojiPickerProps {
  show: boolean
  onEmojiSelected: (emoji: EmojiData) => void
  onDismiss: () => void
}

export const EmojiPicker: React.FC<EmojiPickerProps> = ({ show, onEmojiSelected, onDismiss }) => {
  const pickerRef = useRef(null)

  useClickAway(pickerRef, () => {
    onDismiss()
  })

  return (
    <ShowIf condition={show}>
      <div ref={pickerRef}>
        <NimblePicker
          data={emojiData as unknown as Data}
          native={true}
          onSelect={onEmojiSelected}
          theme={'auto'}
          title=''
          style={{ top: '96px' }}
          custom={Object.keys(ForkAwesomeIcons).map((name) => ({
            name: `fa-${name}`,
            short_names: [`fa-${name.toLowerCase()}`],
            text: '',
            emoticons: [],
            keywords: ['fork awesome'],
            imageUrl: '/img/forkawesome.png',
            customCategory: 'ForkAwesome'
          }))
          }
        />
      </div>
    </ShowIf>
  )
}
