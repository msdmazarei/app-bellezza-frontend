import {base_model} from './base_model'
import {IUser} from './user';

export interface user_base_model extends base_model {
    creator?: IUser
    modifier?: IUser
}