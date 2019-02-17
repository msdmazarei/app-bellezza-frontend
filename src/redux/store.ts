import { createStore, ReducersMapObject, AnyAction, combineReducers } from 'redux'
import { IUser } from '../models/user';
import { reducer as UserReducer } from './reducers/user'
import { reducer as LoginDialogReducer } from './reducers/logindialog'
import { reducer as AppSideBarReducer } from './reducers/app_sidebar'
import { reducer as ForgetPasswordReducer } from './reducers/forget_password'
import {reducer as RouteReducer} from './reducers/route'
import { redux_state } from './app_state';


const reducers: ReducersMapObject<redux_state, AnyAction> = {
    signin_dialog_is_shown: LoginDialogReducer,
    logged_in_user: UserReducer,
    is_app_sidebar_open: AppSideBarReducer,
    forget_password: ForgetPasswordReducer,
    current_route: RouteReducer
}

const main_reducer = combineReducers(reducers)

export const Store = createStore(main_reducer)