import { Action } from 'redux'
import { IUser } from '../../../models/user';
import { EACTIONS } from '../../ActionsEnum';
import { UserAction } from '../../Actions/user/UserAction';

export function reducer(S: IUser, action: UserAction): IUser {
    switch (action.type) {
        case EACTIONS.LOGGED_IN:
            return action.payload
        case EACTIONS.LOGGED_OUT:
            return null;
    }
    // if (S == undefined) 
    return {
        id:"msd",
        username:'msd',
        name:"msd"
    };
    // if (S == undefined) 
    // return null;
    // return S;
}