/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useMemo } from 'react'
import type { PropsWithChildren } from 'react'
import { LandingLayout } from '../landing-layout/landing-layout'
import { useTranslation } from 'react-i18next'

export interface CommonErrorPageProps {
  title: string
  description?: string
  titleIsI18nKey?: boolean
  descriptionIsI18nKey?: boolean
}

/**
 * Renders a common customizable error page.
 *
 * @param title The title of the error.
 * @param description The description of the error. Property is optional.
 * @param titleIsI18nKey true when the title should be treated as a translation key.
 * @param descriptionIsI18nKey true when the description should be treated as a translation key.
 * @param children The optional child elements that will be displayed beneath the description.
 */
export const CommonErrorPage: React.FC<PropsWithChildren<CommonErrorPageProps>> = ({
  title,
  description,
  titleIsI18nKey,
  descriptionIsI18nKey,
  children
}) => {
  const { t } = useTranslation()

  const titleText = useMemo(() => {
    return titleIsI18nKey ? t(title) : title
  }, [title, titleIsI18nKey, t])

  const descriptionText = useMemo(() => {
    if (!description) {
      return null
    }
    return descriptionIsI18nKey ? t(description) : description
  }, [description, descriptionIsI18nKey, t])

  return (
    <LandingLayout>
      <div className='text-light d-flex align-items-center justify-content-center my-5'>
        <div>
          <h1>{titleText}</h1>
          <br />
          {descriptionText}
          {children}
        </div>
      </div>
    </LandingLayout>
  )
}
