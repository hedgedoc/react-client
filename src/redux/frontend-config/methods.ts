import {FrontendConfigState} from "./types";
import {store} from "../../utils/store";
import {SET_FRONTEND_CONFIG_ACTION_TYPE, SetFrontendConfigAction} from "./actions";

export const setFrontendConfig = (state: FrontendConfigState) => {
    const action: SetFrontendConfigAction = {
        type: SET_FRONTEND_CONFIG_ACTION_TYPE,
        payload: {
            state
        }
    }
    store.dispatch(action);
}
