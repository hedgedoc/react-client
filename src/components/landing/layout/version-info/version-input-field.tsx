import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Fragment, useRef, useState } from 'react'
import { Button, FormControl, InputGroup, Overlay, Tooltip } from 'react-bootstrap'

export interface VersionInputFieldProps {
  version: string
}

export const VersionInputField: React.FC<VersionInputFieldProps> = ({ version }) => {
  const inputField = useRef<HTMLInputElement>(null)
  const [showCopiedTooltip, setShowCopiedTooltip] = useState(false)

  const copyToClipboard = (element: HTMLInputElement|null) => {
    if (!element) {
      return
    }
    element.select()
    element.setSelectionRange(0, 99999)
    document.execCommand('copy')
    setShowCopiedTooltip(true)
    setTimeout(() => { setShowCopiedTooltip(false) }, 2000)
  }

  return (
    <Fragment>

      <Overlay target={inputField} show={showCopiedTooltip} placement="top">
        {(props) => (
          <Tooltip id={'copied_' + version} {...props}>
            Copied!
          </Tooltip>
        )}
      </Overlay>

      <InputGroup className="mb-3">
        <FormControl readOnly={true} ref={inputField} className={'text-center'} value={version} />
        <InputGroup.Append>
          <Button variant="outline-secondary" onClick={() => copyToClipboard(inputField.current)} title={'Copy'}>
            <FontAwesomeIcon icon={'copy'}/>
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Fragment>
  )
}
