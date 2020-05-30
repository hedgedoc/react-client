import { Action } from 'redux'

export const SET_USER_ACTION_TYPE = 'user/set'
export const CLEAR_USER_ACTION_TYPE = 'user/clear'

export interface SetUserAction extends Action {
    type: string;
    payload: {
        state: UserState,
    };
}

export interface ClearUserAction extends Action {
    type: string;
    payload: null;
}

export interface UserState {
    status: LoginStatus;
    id: string;
    name: string;
    photo: string;
    provider: LoginProvider;
}

export enum LoginStatus {
    forbidden = 'forbidden',
    ok = 'ok'
}

export enum LoginProvider {
    facebook = 'facebook',
    github = 'github',
    twitter = 'twitter',
    gitlab = 'gitlab',
    dropbox = 'dropbox',
    google = 'google',
    saml = 'saml',
    oauth2 = 'oauth2',
    email = 'email',
    ldap = 'ldap',
    openid = 'openid'
}

export type UserActions = SetUserAction | ClearUserAction;
