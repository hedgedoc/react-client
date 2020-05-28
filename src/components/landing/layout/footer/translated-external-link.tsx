import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { ExternalLink } from './external-link'

export interface TranslatedLinkProps {
  href: string;
  i18nKey: string;
}

const TranslatedExternalLink: React.FC<TranslatedLinkProps> = ({ href, i18nKey }) => {
  const { t } = useTranslation()
  return (
    <ExternalLink href={href} text={t(i18nKey)}/>
  )
}

export { TranslatedExternalLink }
