/*
SPDX-FileCopyrightText: 2020 The HedgeDoc developers (see AUTHORS file)

SPDX-License-Identifier: AGPL-3.0-only
*/

import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../../../../redux'
import { ForkAwesomeIcon } from '../../../common/fork-awesome/fork-awesome-icon'
import { ActiveIndicatorStatus } from './active-indicator'
import { ConnectionState } from './connection-state'
import { UserLine } from './user-line'

const ConnectionIndicator: React.FC = () => {
  const connectionState = useSelector((state: ApplicationState) => state.connection.state)

  const userOnline = 2
  return (
    <Dropdown className="small mx-2" alignRight>
      <Dropdown.Toggle id="connection-indicator" size="sm" variant={
        connectionState === ConnectionState.CONNECTED
          ? 'success'
          : connectionState === ConnectionState.DISCONNECTED
            ? 'danger'
            : 'primary'
      } className="text-uppercase">
        <ForkAwesomeIcon icon="users" className={'mr-1'}/> {userOnline} Online
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item disabled={true} className="d-flex align-items-center p-0">
          <UserLine name="Philip Molares" photo="/img/avatar.png" color="red" status={ActiveIndicatorStatus.INACTIVE}/>
        </Dropdown.Item>
        <Dropdown.Item disabled={true} className="d-flex align-items-center p-0">
          <UserLine name="Philip Molares" photo="/img/avatar.png" color="blue" status={ActiveIndicatorStatus.ACTIVE}/>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export { ConnectionIndicator }
