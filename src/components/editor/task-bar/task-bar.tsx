import React from 'react'
import { Button, Nav, Navbar } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ApplicationState } from '../../../redux'
import { Branding } from '../../common/branding/branding'
import { ForkAwesomeIcon } from '../../common/fork-awesome/fork-awesome-icon'
import { ShowIf } from '../../common/show-if/show-if'
import { SignInButton } from '../../landing/layout/navigation/sign-in-button'
import { UserDropdown } from '../../landing/layout/navigation/user-dropdown/user-dropdown'
import { DarkModeButton } from './dark-mode-button'
import { EditorMenu } from './editor-menu'
import { EditorViewMode } from './editor-view-mode'
import { HelpButton } from './help-button'

const TaskBar: React.FC = () => {
  useTranslation()
  const user = useSelector((state: ApplicationState) => state.user)

  return (
    <Navbar bg={'light'}>
      <Nav className="mr-auto d-flex align-items-center">
        <Navbar.Brand>
          <Link to="/intro" className="text-secondary text-decoration-none d-flex align-items-center">
            <ForkAwesomeIcon icon="file-text" className={'mr-2'}/>
            <span>CodiMD</span>
            <Branding inline={true}/>
          </Link>
        </Navbar.Brand>
        <EditorViewMode/>
        <DarkModeButton/>
        <HelpButton/>
      </Nav>
      <Nav className="d-flex align-items-center text-secondary">
        <Button className="ml-2 text-secondary" size="sm" variant="outline-light">
          <ForkAwesomeIcon icon="plus"/> <Trans i18nKey="editor.menu.new"/>
        </Button>
        <div className="text-secondary">
          <EditorMenu/>
        </div>
        <ShowIf condition={!user}>
          <SignInButton />
        </ShowIf>
        <ShowIf condition={!!user}>
          <UserDropdown />
        </ShowIf>
      </Nav>
    </Navbar>
  )
}

export { TaskBar }
