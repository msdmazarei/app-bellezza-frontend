import {base_repo} from './base_repo'
import { IUser } from '../models/user';

export class user_repo extends base_repo{

    static async get_logged_in_user(): Promise<IUser> {
        return {
            id: "logged_in_user",
            name: "msd.mazarei",
            username: "msd.mazarei"
        }
    }
    static get_fake_user(seed: string): IUser{
        return {
            id: seed,
            name: `User${seed}`,
            username: `User${seed}`,
        }
    }

}
