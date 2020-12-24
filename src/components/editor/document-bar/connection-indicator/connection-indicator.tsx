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
  const clients = useSelector((state: ApplicationState) => state.connection.clients)

  return (
    <Dropdown className="small mx-2" alignRight>
      <Dropdown.Toggle id="connection-indicator" size="sm" variant={
        connectionState === ConnectionState.CONNECTED
          ? 'success'
          : connectionState === ConnectionState.DISCONNECTED
            ? 'danger'
            : 'primary'
      } className="text-uppercase">
        <ForkAwesomeIcon icon="users" className={'mr-1'}/> {clients.size} online
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {
          Array.from(clients.values()).map((client, id) => {
            return (
              <Dropdown.Item disabled={true} className="d-flex align-items-center p-0" key={id}>
                {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */}
                <UserLine name={client.user?.name ?? 'Unknown user'} photo="/img/avatar.png" color="red" status={ActiveIndicatorStatus.ACTIVE}/>
              </Dropdown.Item>
            )
          })
        }
      </Dropdown.Menu>
    </Dropdown>
  )
}

export { ConnectionIndicator }
