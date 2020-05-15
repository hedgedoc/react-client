import {Action} from 'redux';
import {FrontendConfigState} from "./types";
import {store} from "../../utils/store";

export const SET_FRONTEND_CONFIG_ACTION_TYPE = 'frontend-config/set';

export interface SetFrontendConfigAction extends Action {
    type: string;
    payload: {
        state: FrontendConfigState;
    };
}

export const setFrontendConfig = (state: FrontendConfigState) => {
    const action: SetFrontendConfigAction = {
        type: SET_FRONTEND_CONFIG_ACTION_TYPE,
        payload: {
            state
        }
    }
    store.dispatch(action);
}

export type FrontendConfigActions = SetFrontendConfigAction;
