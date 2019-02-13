import {Action} from 'redux'
import { EACTIONS } from '../../ActionsEnum';


export function action_open_app_sidebar() : Action<EACTIONS> {
    return {  type: EACTIONS.OPEN_APP_SIDEBAR}
}

export function action_close_app_sidebar(): Action<EACTIONS> {
    return {type: EACTIONS.CLOSE_APP_SIDEBAR}
}