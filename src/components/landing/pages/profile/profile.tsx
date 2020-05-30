import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import { ApplicationState } from '../../../../redux'
import { LoginProvider, LoginStatus } from '../../../../redux/user/types'
import { ProfileAdvancedOptions } from './settings/profile-advanced-options'
import { ProfileChangePassword } from './settings/profile-change-password'
import { ProfileDisplayName } from './settings/profile-display-name'

export const Profile: React.FC = () => {
  const user = useSelector((state: ApplicationState) => state.user)

  if (user.status === LoginStatus.forbidden) {
    return (
      <Redirect to={'/login'} />
    )
  }

  return (
    <div className="my-3">
      <Row className="h-100 flex justify-content-center">
        <Col lg={6}>
          <ProfileDisplayName/>
          { user.provider === LoginProvider.email ? <ProfileChangePassword/> : null }
          <ProfileAdvancedOptions/>
        </Col>
      </Row>
    </div>
  )
}
