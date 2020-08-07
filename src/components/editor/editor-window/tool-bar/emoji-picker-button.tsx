import React, { Fragment, useState } from 'react'
import { Button } from 'react-bootstrap'
import { ForkAwesomeIcon } from '../../../common/fork-awesome/fork-awesome-icon'
import { EmojiPicker } from './emoji-picker/emoji-picker'
import { addEmoji } from './utils'

export interface EmojiPickerButtonProps {
  editor: CodeMirror.Editor
}

export const EmojiPickerButton: React.FC<EmojiPickerButtonProps> = ({ editor }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  return (
    <Fragment>
      <EmojiPicker show={showEmojiPicker} onEmojiSelected={(emoji) => {
        setShowEmojiPicker(false)
        addEmoji(emoji, editor)
      }} onDismiss={() => setShowEmojiPicker(false)}/>
      <Button variant='light' onClick={() => setShowEmojiPicker(old => !old)} title={''}>
        <ForkAwesomeIcon icon="smile-o"/>
      </Button>
    </Fragment>
  )
}
