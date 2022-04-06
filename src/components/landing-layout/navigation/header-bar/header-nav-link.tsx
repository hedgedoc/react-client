/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import Link from 'next/link'
import React, { useMemo } from 'react'
import { Nav } from 'react-bootstrap'
import type { PropsWithDataCypressId } from '../../../../utils/cypress-attribute'
import { cypressId } from '../../../../utils/cypress-attribute'
import styles from './header-nav-link.module.scss'
import { useRouter } from 'next/router'

export interface HeaderNavLinkProps extends PropsWithDataCypressId {
  to: string
}

/**
 * Renders a link for the navigation top bar.
 *
 * @param to The target url
 * @param children The react elements inside of link for more description
 * @param props Other navigation item props
 */
export const HeaderNavLink: React.FC<HeaderNavLinkProps> = ({ to, children, ...props }) => {
  const { route } = useRouter()

  const activeClass = useMemo(() => {
    return route === to ? styles['nav-link-active'] : ''
  }, [route, to])

  return (
    <Nav.Item>
      <Link href={to} passHref={true}>
        <a className={`nav-link text-light ${activeClass} ${styles['nav-link']}`} href={to} {...cypressId(props)}>
          {children}
        </a>
      </Link>
    </Nav.Item>
  )
}
