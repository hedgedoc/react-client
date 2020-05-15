import {Action} from 'redux';
import {FrontendConfigState} from "./types";

export const SET_FRONTEND_CONFIG_ACTION_TYPE = 'frontend-config/set';

export interface SetFrontendConfigAction extends Action {
    type: string;
    payload: {
        state: FrontendConfigState;
    };
}

export type FrontendConfigActions = SetFrontendConfigAction;
