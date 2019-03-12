import {user_base_model as base_model} from './user_base_model';
import { IUser } from './user';

export interface comment extends base_model {
    text: string
    creator: IUser
}