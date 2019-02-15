import { base_repo } from './base_repo'
import { IUser } from '../models/user';
import { sleep } from '../utils';
import {network_connection_error, unauth_error, internal_server_error} from '../utils/make_exception';

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

    static random_error(){
        const rnd = Math.random()
        if (rnd<0.3){
            if (rnd < 0.1)
                throw network_connection_error()
                else
                throw internal_server_error()
        }
    }
    static async authenticate(username: string, password: string): Promise<IUser> {
        this.random_error()

        if (username == "0000000000" && password == "0000000000") {
            return {
                username: username,
                id: username,
                name: "user0"
            }
        } else {
            throw unauth_error()
        }
    }

    static async logout(username: string): Promise<boolean>{
        this.random_error()
        return true;
    }



}
