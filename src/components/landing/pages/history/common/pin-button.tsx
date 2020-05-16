import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";

export interface PinButtonProps {
    pin: boolean;
    onPinClick: () => void;
}

const PinButton: React.FC<PinButtonProps> = ({pin, onPinClick}) => {
    return (
        <FontAwesomeIcon
            icon="thumbtack"
            className={`history-pin ${pin ? 'active' : ''}`}
            onClick={onPinClick}
        />
    );
}

export { PinButton }
