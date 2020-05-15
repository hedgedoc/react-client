import {FrontendConfigState} from "../redux/frontend-config/types";
import {BackendConfigState} from "../redux/backend-config/types";
import {expectResponseCode} from "../utils/apiUtils";

export const getBackendConfig = async (backendUrl: string) => {
    return fetch(backendUrl + '/backend-config.json')
        .then(expectResponseCode())
        .then(response => response.json() as Promise<BackendConfigState>);
}

export const getFrontendConfig = async () => {
    return fetch('/config.json')
        .then(expectResponseCode())
        .then(response => response.json() as Promise<FrontendConfigState>);
}