import { combineReducers, Reducer } from 'redux'
import { UserState } from './user/types'
import { UserReducer } from './user/reducers'
import { ModalShowReducer } from './modal/reducers'
import { ModalShowState } from './modal/types'
import { BackendConfigState } from './backend-config/types'
import { FrontendConfigState } from './frontend-config/types'
import { BackendConfigReducer } from './backend-config/reducers'
import { FrontendConfigReducer } from './frontend-config/reducers'
import { EditorConfigState } from './editor/types'
import { EditorConfigReducer } from './editor/reducers'

export interface ApplicationState {
    user: UserState;
    modalShow: ModalShowState;
    backendConfig: BackendConfigState;
    frontendConfig: FrontendConfigState;
    editorConfig: EditorConfigState;
}

export const allReducers: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  user: UserReducer,
  modalShow: ModalShowReducer,
  backendConfig: BackendConfigReducer,
  frontendConfig: FrontendConfigReducer,
  editorConfig: EditorConfigReducer
})
