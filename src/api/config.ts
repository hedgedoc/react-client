import {FrontendConfigState} from "../redux/frontend-config/types";
import {BackendConfigState} from "../redux/backend-config/types";

export const getBackendConfig = async (backendUrl: string) => {
    return fetch(backendUrl + '/backend-config.json')
        .then((response) => {
            if (response.status === 200) {
                return (response.json() as Promise<BackendConfigState>);
            }
        });
}

export const getFrontendConfig = async () => {
    return fetch('/config.json')
        .then((response) => {
            if (response.status === 200) {
                return (response.json() as Promise<FrontendConfigState>);
            }
        });
}