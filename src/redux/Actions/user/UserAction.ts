import {Action} from 'redux'
import { EACTIONS } from '../../ActionsEnum';
import { IUser } from '../../../models/user';

export interface UserAction extends Action<EACTIONS> {
    payload: IUser
}