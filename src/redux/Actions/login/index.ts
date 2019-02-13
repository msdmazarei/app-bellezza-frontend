import {Action, ActionCreator} from 'redux'
import {EACTIONS} from '../../ActionsEnum'

export function action_show_login_dialog(): Action<EACTIONS> {
    const rtn : Action<EACTIONS> = { type: EACTIONS.SHOW_LOGIN_DIALOG}
    return rtn;
}

export function action_login_dialog_closed(): Action<EACTIONS> {
    const rtn: Action<EACTIONS> = {type: EACTIONS.CLOSE_LOGIN_DIALOG}
    return rtn
}


