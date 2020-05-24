import React from 'react'
import screenshot from './img/screenshot.png';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button} from 'react-bootstrap';
import {Trans, useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../../../redux";
import {FeatureLinks} from "./feature-links";
import {LoginStatus} from "../../../../redux/user/types";

const Intro: React.FC = () => {
    useTranslation();
    const user = useSelector((state: ApplicationState) => state.user);

    return (
        <div>
            <h1>
                <FontAwesomeIcon icon="file-alt"/> CodiMD
            </h1>
            <p className="lead mb-5">
                <Trans i18nKey="coverSlogan"/>
            </p>

            {
                user.status === LoginStatus.forbidden ?
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
                :
                    null
            }

            <img alt="CodiMD Screenshot" src={screenshot} className="img-fluid mb-5"/>
            <FeatureLinks/>
        </div>
    )
}

export {Intro}
