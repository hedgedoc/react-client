/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 *SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { Fragment } from 'react'
import { Trans } from 'react-i18next'
import { Branding } from '../common/branding/branding'
import {
  HedgeDocLogoSize,
  HedgeDocLogoType,
  HedgeDocLogoWithText
} from '../common/hedge-doc-logo/hedge-doc-logo-with-text'
import { RenderIframe } from '../editor-page/renderer-pane/render-iframe'
import { CoverButtons } from './cover-buttons/cover-buttons'
import { FeatureLinks } from './feature-links'
import { useIntroPageContent } from './hooks/use-intro-page-content'

export const IntroPage: React.FC = () => {
  const introPageContent = useIntroPageContent()

  return (
    <Fragment>
      <div className={'flex-fill mt-3'}>
    <h1 dir='auto' className={ 'align-items-center d-flex justify-content-center flex-column' }>
      <HedgeDocLogoWithText logoType={ HedgeDocLogoType.COLOR_VERTICAL } size={ HedgeDocLogoSize.BIG }/>
    </h1>
    <p className="lead">
      <Trans i18nKey="app.slogan"/>
    </p>
    <div className={ 'mb-5' }>
      <Branding delimiter={ false }/>
    </div>
<CoverButtons/>
        <RenderIframe
          extraClasses={'w-100'}
          markdownContent={introPageContent}/>
        <hr className={'mb-5'}/>
      </div>
      <FeatureLinks/>
    </Fragment>)
}
