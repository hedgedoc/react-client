import React from 'react'
import { Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Branding } from '../../common/branding/branding'
import {
  HedgeDocLogoFillType,
  HedgeDocLogoSize,
  HedgeDocLogoWithText
} from '../../common/hedge-doc-logo/hedge-doc-logo-with-text'

export const NavbarBranding: React.FC = () => {
  return (
    <Navbar.Brand>
      <Link to="/intro" className="text-secondary text-decoration-none d-flex align-items-center">
        <HedgeDocLogoWithText fillType={HedgeDocLogoFillType.MONO} size={HedgeDocLogoSize.SMALL}/>
        <Branding inline={true}/>
      </Link>
    </Navbar.Brand>
  )
}
