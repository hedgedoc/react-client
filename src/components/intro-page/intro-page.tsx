import React, { Fragment } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Branding } from '../common/branding/branding'
import {
  HedgeDocLogoFillType,
  HedgeDocLogoSize,
  HedgeDocLogoWithText
} from '../common/hedge-doc-logo/hedge-doc-logo-with-text'
import { CoverButtons } from './cover-buttons/cover-buttons'
import { FeatureLinks } from './feature-links'
import screenshot from './img/screenshot.png'

export const IntroPage: React.FC = () => {
  const { t } = useTranslation()

  return <Fragment>
    <h1 dir='auto' className={'align-items-center d-flex justify-content-center'}>
      <span>
        <HedgeDocLogoWithText fillType={HedgeDocLogoFillType.COLOR} size={HedgeDocLogoSize.MEDIUM} />
      </span>
      <Branding/>
    </h1>
    <p className="lead mb-5">
      <Trans i18nKey="app.slogan"/>
    </p>

    <CoverButtons/>
    <img alt={t('landing.intro.screenShotAltText')} src={screenshot} className="img-fluid mb-5"/>
    <FeatureLinks/>
  </Fragment>
}
