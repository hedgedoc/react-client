import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import "./close-button.scss"
import {Button} from "react-bootstrap";

const CloseButton: React.FC = () => {
    return (
        <Button variant={"light"}>
            <FontAwesomeIcon
                className="history-close"
                icon="times"
            />
        </Button>
    );
}

export {CloseButton}
