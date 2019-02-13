import { Action } from 'redux'
import { EACTIONS } from '../ActionsEnum';
import { rstate_forget_password } from '../app_state';

export function reducer(state: rstate_forget_password, action: Action<EACTIONS>): rstate_forget_password {
    if (state === undefined)
        return { show_dialog: false }

    switch (action.type) {
        case EACTIONS.OPEN_FORGET_PASSWORD_DIALOG:
            return { ...state, show_dialog: true }
        case EACTIONS.CLOSE_FORGET_PASSWROD_DIALOG:
            return { ...state, show_dialog: false }
        default:
            return state
    }
}