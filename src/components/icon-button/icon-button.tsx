import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./icon-button.scss";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {Button, ButtonProps} from "react-bootstrap";

export interface SocialButtonProps extends ButtonProps {
    icon: IconProp
    title?: string
}

export const IconButton: React.FC<SocialButtonProps> = ({icon, children, variant}) => {
    return (
        <Button variant={variant} className={"btn-icon p-0 d-inline-flex align-items-stretch"}>
            <span className="icon-part d-flex align-items-center">
                <FontAwesomeIcon icon={icon} className={"icon"}/>
            </span>
            <span className="text-part d-flex align-items-center">
                {children}
            </span>
        </Button>
    )
}
