import {Action, ActionCreator} from 'redux'
import {EACTIONS} from '../../ActionsEnum'

export function action_show_signup_dialog(): Action<EACTIONS> {
    const rtn : Action<EACTIONS> = { type: EACTIONS.OPEN_SIGNUP_DIALOG}
    return rtn;
}

export function action_close_signup_dialog(): Action<EACTIONS> {
    const rtn: Action<EACTIONS> = {type: EACTIONS.CLOSE_SIGNUP_DIALOG}
    return rtn
}

