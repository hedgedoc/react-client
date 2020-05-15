import {Action, ActionCreator} from 'redux';
import {FrontendConfigState} from "./types";

export const SET_FRONTEND_CONFIG_ACTION_TYPE = 'frontend-config/set';

export interface SetFrontendConfigAction extends Action {
    type: string;
    payload: {
        state: FrontendConfigState;
    };
}

export const setFrontendConfig: ActionCreator<SetFrontendConfigAction> = (state: FrontendConfigState) => ({
    type: SET_FRONTEND_CONFIG_ACTION_TYPE,
    payload: {
        state
    },
})

export type FrontendConfigActions = SetFrontendConfigAction;
