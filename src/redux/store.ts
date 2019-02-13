import {createStore, ReducersMapObject, AnyAction,combineReducers} from 'redux'
import { IUser } from '../models/user';
import {reducer as UserReducer} from './reducers/user'
import {reducer as LoginDialogReducer} from './reducers/logindialog'
import {reducer as AppSideBarReducer} from './reducers/app_sidebar'
export interface redux_state {
    signin_dialog_is_shown: boolean
    logged_in_user: IUser
    is_app_sidebar_open: boolean
}

const reducers : ReducersMapObject<redux_state, AnyAction> = {
 signin_dialog_is_shown: LoginDialogReducer,
 logged_in_user: UserReducer, 
 is_app_sidebar_open: AppSideBarReducer

}

const main_reducer = combineReducers(reducers)

export const Store = createStore(main_reducer)