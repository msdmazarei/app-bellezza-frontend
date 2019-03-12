import {base_model} from './base_model';

export interface IUser extends base_model {
    name: string
    avatar?: string
    username: string
    title?: string
    birthday? : number
    password? : string
    bio?: string
}