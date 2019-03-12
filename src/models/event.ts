import {user_base_model as base_model} from './user_base_model';
import { IUser } from './user';

export interface event extends base_model {
    action: string
    creator: IUser
    entity_id: string
    entity_name: string
    target: string
    seen: boolean
}