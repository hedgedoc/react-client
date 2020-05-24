import React from 'react'
import screenshot from './img/screenshot.png';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button} from 'react-bootstrap';
import {Trans, useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../../../redux";
import {Features} from "./features/features";

const Intro: React.FC = () => {
    useTranslation();
    const url =  useSelector((state: ApplicationState) => state.frontendConfig.backendUrl);
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
                user.status === "forbidden" ?
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

                        <Button
                            variant="primary"
                            size="lg"
                            href={`${url}/features`}
                            style={{minWidth: "200px"}}
                        >
                            <Trans i18nKey="exploreFeatures"/>
                        </Button>
                    </div>
                :
                    null
            }

            <img alt="CodiMD Screenshot" src={screenshot} className="img-fluid mb-5"/>
            <Features/>
        </div>
    )
}

export {Intro}
