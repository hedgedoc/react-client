import {Trans, useTranslation} from "react-i18next";
import {Button, Form} from "react-bootstrap";
import React, {Fragment, useState} from "react";
import {postEmailLogin} from "../../../../../api/user";
import {useDispatch} from "react-redux";
import {getAndSetUser} from "../../../../initialize/initialize-user-state-from-api";

const ViaEMail: React.FC = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    const login = (event: any) => {
        const email = event.currentTarget[0].value
        const password = event.currentTarget[1].value
        postEmailLogin(email, password).then(response => {
            if (response.status !== 200) {
                setError(true);
            } else {
                // ToDo Extract auth data and set
                console.log(response)
                getAndSetUser(dispatch);
            }
        })
        event.preventDefault();
    }

    const feedback = (<Form.Control.Feedback type="invalid"><Trans i18nKey="errorEmailLogin"/></Form.Control.Feedback>);

    return (
        <Fragment>
            <h5 className="center">
                <Trans i18nKey="signInVia" values={{service: "E-Mail"}}/>
            </h5>
            <Form onSubmit={login}>
                <Form.Group controlId="email">
                    <Form.Control isInvalid={error} type="email" size="sm" placeholder={t("email")} />
                    {feedback}
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Control isInvalid={error} type="password" size="sm" placeholder={t("password")} />
                    {feedback}
                </Form.Group>
                <Button
                    type="submit"
                    size="sm"
                    variant="primary"
                >
                    <Trans i18nKey="signIn"/>
                </Button>
            </Form>
        </Fragment>
    );
}

export { ViaEMail }
