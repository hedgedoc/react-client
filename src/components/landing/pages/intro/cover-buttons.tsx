import {LoginStatus} from "../../../../redux/user/types";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import {Trans, useTranslation} from "react-i18next";
import React from "react";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../../../redux";

export const CoverButtons: React.FC = () => {
    useTranslation();
    const user = useSelector((state: ApplicationState) => state.user);

    if (user.status === LoginStatus.ok) {
        return null;
    }

    return (
        <div className="mb-5">
            <Link to="/login">
                <Button
                    variant="success"
                    size="lg"
                    style={{minWidth: "200px"}}
                >
                    <Trans i18nKey="signIn"/>
                </Button>
            </Link>


            <span className="m-2">
                            <Trans i18nKey="or"/>
                        </span>

            <Link to="/features">
                <Button
                    variant="primary"
                    size="lg"
                    style={{minWidth: "200px"}}
                >
                    <Trans i18nKey="exploreFeatures"/>
                </Button>
            </Link>
        </div>
    );

}
