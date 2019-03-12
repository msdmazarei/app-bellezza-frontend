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
    if (S===null) return S
    if (S === undefined) 
    // return null;
    return {
        id:"msd",
        username:'09360076133',
        name:"msd",
        password: "1234"
    };
    return S
    // if (S == undefined) 
    // return null;
    // return S;
}