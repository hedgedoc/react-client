/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { CommonErrorPage } from '../components/error-pages/common-error-page'
import type { NextPage } from 'next'

/**
 * Renders a hedgedoc themed 404 page
 */
const Custom404: NextPage = () => {
  return (
    <CommonErrorPage
      title={'errors.notFound.title'}
      description={'errors.notFound.description'}
      descriptionIsI18nKey={true}
    />
  )
}

export default Custom404
