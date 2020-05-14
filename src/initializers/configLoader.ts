import {getBackendConfig, getFrontendConfig} from "../api/config";
import {Dispatch} from "redux";
import {FrontendConfigActions, setFrontendConfig} from "../redux/frontend-config/actions";
import {BackendConfigActions, setBackendConfig} from "../redux/backend-config/actions";

export function loadAllConfig(dispatch: Dispatch<FrontendConfigActions | BackendConfigActions>) {
    return getFrontendConfig()
        .then((frontendConfig) => {
            if (!frontendConfig) {
                return Promise.reject("Frontend config invalid");
            }
            dispatch(setFrontendConfig(frontendConfig));
            return getBackendConfig(frontendConfig.backendUrl)
        })
        .then((backendConfig) => {
            if (!backendConfig) {
                return Promise.reject("Backend config invalid");
            }
            dispatch(setBackendConfig({
                allowAnonymous: backendConfig.allowAnonymous,
                authProviders: {
                    facebook: backendConfig.authProviders.facebook,
                    github: backendConfig.authProviders.github,
                    twitter: backendConfig.authProviders.twitter,
                    gitlab: backendConfig.authProviders.gitlab,
                    dropbox: backendConfig.authProviders.dropbox,
                    ldap: backendConfig.authProviders.ldap,
                    google: backendConfig.authProviders.google,
                    saml: backendConfig.authProviders.saml,
                    oauth2: backendConfig.authProviders.oauth2,
                    email: backendConfig.authProviders.email
                },
                specialLinks: {
                    privacy: backendConfig.specialLinks.privacy,
                    termsOfUse: backendConfig.specialLinks.termsOfUse,
                    imprint: backendConfig.specialLinks.imprint,
                }
            }))
        });
}

