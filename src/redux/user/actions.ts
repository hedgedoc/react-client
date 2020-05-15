import {Action} from 'redux';
import {UserState} from "./types";
import {store} from "../../utils/store";

export const SET_USER_ACTION_TYPE = 'user/set';
export const CLEAR_USER_ACTION_TYPE = 'user/clear';

export interface SetUserAction extends Action {
    type: string;
    payload: {
        state: UserState,
    };
}

export interface ClearUserAction extends Action {
    type: string;
    payload: {};
}

export const setUser = (state: UserState) => {
    const action: SetUserAction = {
        type: SET_USER_ACTION_TYPE,
        payload: {
            state
        }
    }
    store.dispatch(action);
}

export const clearUser = () => {
    const action: ClearUserAction = {
        type: CLEAR_USER_ACTION_TYPE,
        payload: {},
    }
    store.dispatch(action);
}

export type UserActions = SetUserAction | ClearUserAction;