import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import "./pin-button.scss"
import {Button} from "react-bootstrap";

export interface PinButtonProps {
    pin: boolean;
    onPinClick: () => void;
}

const PinButton: React.FC<PinButtonProps> = ({pin, onPinClick}) => {
    return (
        <Button variant={"light"}
                onClick={onPinClick}>
            <FontAwesomeIcon
                icon="thumbtack"
                className={`history-pin ${pin ? 'active' : ''}`}
            />
        </Button>
    );
}

export { PinButton }
