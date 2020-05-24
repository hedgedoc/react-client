import {Col, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Trans} from "react-i18next";
import React from "react";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../../../../redux";

const Features: React.FC = () => {
    const url =  useSelector((state: ApplicationState) => state.frontendConfig.backendUrl);
    return (
        <Row className="mb-5">
            <Col md={4} className="inner">
                <a href={`${url}/features#Share-Notes`} className="text-light">
                    <FontAwesomeIcon icon="bolt" size="3x"/>
                    <h5>
                        <Trans i18nKey="featureCollaboration"/>
                    </h5>
                </a>
            </Col>
            <Col md={4} className="inner">
                <a href={`${url}/features#MathJax`} className="text-light">
                    <FontAwesomeIcon icon="chart-bar" size="3x"/>
                    <h5>
                        <Trans i18nKey="featureMathJax"/>
                    </h5>
                </a>
            </Col>
            <Col md={4} className="inner">
                <a href={`${url}/features#Slide-Mode`} className="text-light">
                    <FontAwesomeIcon icon="tv" size="3x"/>
                    <h5>
                        <Trans i18nKey="featureSlides"/>
                    </h5>
                </a>
            </Col>
        </Row>
    );
}

export { Features }
