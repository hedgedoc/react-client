import { EmojiData, NimblePicker, Data } from 'emoji-mart'
import React from 'react'
import { ShowIf } from '../../../common/show-if/show-if'
import emojiData from 'emoji-mart/data/twitter.json'
import 'emoji-mart/css/emoji-mart.css'
import './emoji-picker.scss'

export interface EmojiPickerProps {
  show: boolean
  onEmojiSelected: (emoji: EmojiData) => void
}

export const EmojiPicker: React.FC<EmojiPickerProps> = ({ show, onEmojiSelected }) => {
  return (
    <ShowIf condition={show}>
      <NimblePicker data={emojiData} set={'twitter'} onSelect={onEmojiSelected} theme={'auto'}/>
    </ShowIf>
  )
}
