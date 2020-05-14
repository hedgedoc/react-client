import {Trans, useTranslation} from "react-i18next";
import {Button, Form} from "react-bootstrap";
import React, { Fragment } from "react";
import {useDispatch} from "react-redux";
import {setUser} from "../../../../../redux/user/actions";
import {LoginStatus} from "../../../../../redux/user/types";

const ViaEMail: React.FC = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const login = () => {
        dispatch(setUser({photo: "https://robohash.org/testy.png", name: "Test", status: LoginStatus.ok}));
    }
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
