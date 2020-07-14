import { EmojiData, NimblePicker, Data } from 'emoji-mart'
import React from 'react'
import { ShowIf } from '../../../../common/show-if/show-if'
import emojiData from 'emoji-mart/data/twitter.json'
import 'emoji-mart/css/emoji-mart.css'
import './emoji-picker.scss'
import { ForkAwesomeIcons } from './icon-names'

export interface EmojiPickerProps {
  show: boolean
  onEmojiSelected: (emoji: EmojiData) => void
}

export const EmojiPicker: React.FC<EmojiPickerProps> = ({ show, onEmojiSelected }) => {
  return (
    <ShowIf condition={show}>
      <NimblePicker
        data={emojiData as unknown as Data}
        set={'twitter'}
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
          imageUrl: 'https://github.githubassets.com/images/icons/emoji/octocat.png',
          customCategory: 'ForkAwesome'
        }))
        }
      />
    </ShowIf>
  )
}
