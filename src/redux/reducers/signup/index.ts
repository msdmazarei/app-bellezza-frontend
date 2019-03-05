import {Reducer, Action} from 'redux'
import { EACTIONS } from '../../ActionsEnum';


export function reducer(show_dialog: boolean, action: Action<EACTIONS>) : boolean {

    switch(action.type){
        case EACTIONS.OPEN_SIGNUP_DIALOG: 
            return true
        case EACTIONS.CLOSE_SIGNUP_DIALOG:
            return false

    }
    if(show_dialog!=null) return show_dialog;
    return false;
}