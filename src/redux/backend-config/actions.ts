import {Action} from 'redux';
import {BackendConfigState} from "./types";

export const SET_BACKEND_CONFIG_ACTION_TYPE = 'frontend-config/set';

export interface SetBackendConfigAction extends Action {
    type: string;
    payload: {
        state: BackendConfigState;
    };
}

export type BackendConfigActions = SetBackendConfigAction;
