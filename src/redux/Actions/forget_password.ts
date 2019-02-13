import { Action } from 'redux'
import { EACTIONS } from '../ActionsEnum';

export function action_open_forget_password_dialog(): Action<EACTIONS> {
    return { type: EACTIONS.OPEN_FORGET_PASSWORD_DIALOG }
}

export function action_close_forget_password_dialog(): Action<EACTIONS> {
    return { type: EACTIONS.CLOSE_FORGET_PASSWROD_DIALOG }
}