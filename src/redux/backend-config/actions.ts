import {Action, ActionCreator} from 'redux';
import {BackendConfigState} from "./types";

export const SET_BACKEND_CONFIG_ACTION_TYPE = 'frontend-config/set';

export interface SetBackendConfigAction extends Action {
    type: string;
    payload: {
        state: BackendConfigState;
    };
}

export const setBackendConfig: ActionCreator<SetBackendConfigAction> = (state: BackendConfigState) => ({
    type: SET_BACKEND_CONFIG_ACTION_TYPE,
    payload: {
        state
    },
})

export type BackendConfigActions = SetBackendConfigAction;
