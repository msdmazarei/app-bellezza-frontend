import { Action } from 'redux'
import { EACTIONS } from '../ActionsEnum';

export function reducer(sidebar_status: boolean, action: Action<EACTIONS>): boolean {
     console.log('appsidebar reducer called. action:',action)
    switch (action.type) {
        case EACTIONS.OPEN_APP_SIDEBAR:
            return true;
        case EACTIONS.CLOSE_APP_SIDEBAR:
            return false;
        default:
            return false
    }
}