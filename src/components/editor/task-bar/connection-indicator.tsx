import React from "react";
import {Dropdown} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {UserAvatar} from "../../landing/layout/user-avatar/user-avatar";
import "./connection-indicator.scss";

const ConnectionIndicator: React.FC = () => {
    const userOnline = 1;
    return (
        <Dropdown className="small">
            <Dropdown.Toggle id="connection-indicator" size="sm" variant="primary" className="all-caps">
                <FontAwesomeIcon icon="users"/> {userOnline} Online
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item className="d-flex align-items-center connection-dropdown-item">
                    <UserAvatar name="Philip Molares" photo="https://robohash.org/dermolly.png" color="red"/> <FontAwesomeIcon icon="circle"/>
                </Dropdown.Item>
                <Dropdown.Item className="d-flex align-items-center connection-dropdown-item">
                    <UserAvatar name="Philip Molares" photo="https://robohash.org/dermolly.png" color="blue"/> <FontAwesomeIcon icon="circle"/>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export {ConnectionIndicator}
