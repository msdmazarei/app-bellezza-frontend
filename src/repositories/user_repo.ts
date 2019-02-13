import { base_repo } from './base_repo'
import { IUser } from '../models/user';
import { sleep } from '../utils';

export class user_repo extends base_repo {

    static async get_logged_in_user(): Promise<IUser> {
        return {
            id: "logged_in_user",
            name: "msd.mazarei",
            username: "msd.mazarei"
        }
    }
    static get_fake_user(seed: string): IUser {
        return {
            id: seed,
            name: `User${seed}`,
            username: `User${seed}`,
        }
    }

    static async get_reset_token(username: string): Promise<Boolean> {
        await sleep(5000);
        if (Math.random() > 0.5)

            return true;

        else
            throw new Error("network problem happen")
    }


}
