import React from "react"
import {Card, Col, Row} from "react-bootstrap"
import {Trans, useTranslation} from "react-i18next";
import {ViaEMail} from "./auth/via-email";
import {OneClickType, ViaOneClick} from "./auth/via-one-click";
import {ViaLdap} from "./auth/via-ldap";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../../../redux";
import {ViaOpenId} from "./auth/via-openid";
import "./login.scss";

const Login: React.FC = () => {
    useTranslation();
    const authProviders = useSelector((state: ApplicationState) => state.backendConfig.authProviders);
    const customAuthNames = useSelector((state: ApplicationState) => state.backendConfig.customAuthNames);
    const emailForm = authProviders.email ? <ViaEMail/> : null
    const ldapForm = authProviders.ldap ? <ViaLdap/> : null
    const openIdForm = authProviders.openid ? <ViaOpenId/> : null

    const oneClickCustomName: (type: OneClickType) => string | undefined = (type) => {
        switch (type) {
            case OneClickType.SAML:
                return customAuthNames.saml;
            case OneClickType.OAUTH2:
                return customAuthNames.oauth2;
            default:
                return undefined;
        }
    }

    return (
        <div className="my-3">
            <Row className="h-100 flex justify-content-center">
                {
                    authProviders.email || authProviders.ldap || authProviders.openid ?
                        <Col xs={12} sm={10} lg={4}>
                            {emailForm}
                            {ldapForm}
                            {openIdForm}
                        </Col>
                        : null
                }
                <Col xs={12} sm={10} lg={4}>
                    <Card className="bg-dark mb-4">
                        <Card.Body>
                            <Card.Title>
                                <Trans i18nKey="signInVia" values={{service: ""}}/>
                            </Card.Title>
                            <div className={"d-flex align-items-center flex-column flex-wrap one-click-login justify-content-center"}>
                                {
                                    Object.values(OneClickType)
                                        .filter((value) => authProviders[value])
                                        .map((value) => {
                                            return (
                                                <div
                                                    className="p-2 d-flex flex-column social-button-container"
                                                    key={value}
                                                >
                                                    <ViaOneClick
                                                        oneClickType={value}
                                                        optionalName={oneClickCustomName(value)}
                                                    />
                                                </div>
                                            )
                                        })
                                }
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export {Login}
