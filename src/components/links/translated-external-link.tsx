import { StringMap, TOptionsBase } from 'i18next'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ExternalLink } from './external-link'
import { GeneralLinkProp } from './types'

export interface TranslatedLinkProps {
  i18nKey: string;
  i18nOption?: (TOptionsBase & StringMap) | string
}

const TranslatedExternalLink: React.FC<GeneralLinkProp & TranslatedLinkProps> = ({ i18nKey, i18nOption, ...props }) => {
  const { t } = useTranslation()
  return (
    <ExternalLink text={t(i18nKey, i18nOption)} {...props}/>
  )
}

export { TranslatedExternalLink }
