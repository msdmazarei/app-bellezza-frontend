import { base_repo } from './base_repo'
import { IUser } from '../models/user';
import { sleep } from '../utils';
import { network_connection_error, unauth_error, internal_server_error, user_already_exist, its_very_soon_to_try, general_error } from '../utils/make_exception';
import axios, { AxiosError } from 'axios'
import * as http_helper from '../utils/http_helper'
import { BaseError } from '../exceptions/BaseError';
export class user_repo extends base_repo {

    static base_url: string = '/user'


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

    static random_error() {
        const rnd = Math.random()
        if (rnd < 0.3) {
            if (rnd < 0.1)
                throw network_connection_error()
            else
                throw internal_server_error()
        }
    }
    static async authenticate(username: string, password: string): Promise<IUser> {
        try {
            const res : any = await axios.get<IUser>(`/api/users/profile`, {
                auth: {
                    username: username,
                    password: password
                }
            })
            if (http_helper.is_ok_response(res.status)) {
                return {
                    id: res.data.id,
                    create_unixepoch: res.data.creation_date,
                    modify_unixepoch: res.data.modification_date, 
                    name: res.data.name,
                    password: res.data.password,
                    username: res.data.username
                }
                return res.data
            } else {
                throw general_error(res.status, "unexpected status", "مقدار غیر منتظره")
            }

        } catch (e) {
            const err: AxiosError = e;
            if (err.response.status == 401) throw unauth_error();

        }

    }

    static async logout(username: string): Promise<boolean> {
        this.random_error()
        return true;
    }

    static async register(mobile_no: string, code: string, name: string, password: string): Promise<IUser> {
        try {
            const result = await axios.post('/api/users', {
                cell_no: mobile_no,
                name: name,
                activation_code: code,
                password: password
            })
            if (http_helper.is_ok_response(result.status)) {
                return result.data
            }
        } catch (e) {
            const error: AxiosError = e;
            if (error.response.status == 404) {
                throw general_error(404,
                    "act_code_expired",
                    " کد فعال سازی شما منقضی شده. مجدد تلاش کنید")

            }
            if (error.response.status == 400) {
                throw general_error(400,
                    "act_code_wrong",
                    "کد فعال سازی صحیح نمی باشد")
            }
            if (error.response.status == 409) {
                if ('name' in error.response.data) {
                    throw general_error(409,
                        "dupplicate_name", "نام قبلا برای دیگری انتخاب شده است")
                } else if ('cell_no' in error.response.data) {
                    throw general_error(409, "dupplicate_username",
                        "شماره همراه قبلا ثبت نام شده است")
                } else {
                    throw internal_server_error()
                }
            }

            //404 -> activation code failur expire
            // 400 -> activation code wrong
            //409 -> name uniqueness  or username uniqueness

        }
    }
    static async send_register_code(mobile_no: string): Promise<boolean> {
        try {
            const result = await axios.post('/api/register/send-code', { "cell_no": mobile_no })
            if (http_helper.is_ok_response(result.status)) {
                return true
            }
        } catch (e) {
            const error: AxiosError = e;
            if (error.response.status == 409) throw user_already_exist();
            if (error.response.status == 403) throw its_very_soon_to_try();
        }


        throw internal_server_error()
    }



}
