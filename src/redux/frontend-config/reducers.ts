import {Reducer} from 'redux';
import {FrontendConfigState} from './types';
import {FrontendConfigActions, SET_FRONTEND_CONFIG_ACTION_TYPE} from "./actions";

export const initialState: FrontendConfigState = {
    backendUrl: ""
};

export const FrontendConfigReducer: Reducer<FrontendConfigState, FrontendConfigActions> = (state: FrontendConfigState = initialState, action: FrontendConfigActions) => {
    switch (action.type) {
        case SET_FRONTEND_CONFIG_ACTION_TYPE:
            return action.payload.state;
        default:
            return state;
    }
};
