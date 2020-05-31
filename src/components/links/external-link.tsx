import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Fragment } from 'react'
import { GeneralLinkProp } from './types'

export interface ExternalLinkProps {
  text: string;
}

export const ExternalLink: React.FC<GeneralLinkProp & ExternalLinkProps> = ({ href, text, icon, className = 'text-light' }) => {
  return (
    <a href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}>
      {
        icon
          ? <Fragment>
            <FontAwesomeIcon icon={icon} fixedWidth={true}/>&nbsp;
          </Fragment>
          : null
      }
      {text}
    </a>
  )
}
