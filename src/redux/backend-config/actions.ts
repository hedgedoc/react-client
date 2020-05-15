import {Action} from 'redux';
import {BackendConfigState} from "./types";
import {store} from "../../utils/store";

export const SET_BACKEND_CONFIG_ACTION_TYPE = 'frontend-config/set';

export interface SetBackendConfigAction extends Action {
    type: string;
    payload: {
        state: BackendConfigState;
    };
}

export const setBackendConfig = (state: BackendConfigState) => {
    const action: SetBackendConfigAction = {
        type: SET_BACKEND_CONFIG_ACTION_TYPE,
        payload: {
            state
        }
    };
    store.dispatch(action)
}

export type BackendConfigActions = SetBackendConfigAction;
