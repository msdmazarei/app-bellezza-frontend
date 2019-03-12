import { AxiosError, AxiosResponse, AxiosPromise } from "axios";
import { unauth_error, general_error, internal_server_error } from "../utils/make_exception";
import { IUser } from "../models/user";

export class base_repo {
    static async run_http<T>(fn: () => AxiosPromise<T>): Promise<AxiosResponse<T>> {
        try {
            const res = await fn()
            return res
        } catch (e) {
            const err: AxiosError = e
            base_repo.general_http_exception(err)
        }
    }
    static general_http_exception(e: AxiosError) {
        if (e.response.status == 401) throw unauth_error()
        if (e.response.status == 400) throw general_error(400, "bad_request", "داده ارسالی به سرور صحیح نیست")
        if (e.response.status > 499) throw internal_server_error()
        if (e.response.status == 404) throw general_error(404, "NOTFOUND", "یافت نشد")
    }
    static auth_config(user: IUser) {
        if (user == null) return {}
        return {
            auth: {
                username: user.username,
                password: user.password
            }
        }
    }
}