import { UnAuthenticated } from '../exceptions/UnAuthenticated'
import { func } from 'prop-types';
import { InternalServerError } from '../exceptions/InternalServerError';
import { NetworkConnectionError } from '../exceptions/NetworkConnectionError';


export function unauth_error(): UnAuthenticated {
    const rtn: UnAuthenticated = {
        no: 401,
        code: "401",
        display_message: "نام کاربری یا کلمه عبور اشتباه است!",
        message: "unauth",
        name: "unauth"
    }

    return rtn;
}


export function internal_server_error() : InternalServerError {
    const rtn : InternalServerError = {
        no: 500,
        code: "500",
        display_message: "خطا در سرور .بعدا محدد تلاش کنید",
        message: "internal_server_error",
        name: "internal_server_error"
    }
    return rtn
}

export function network_connection_error(): NetworkConnectionError {
    const rtn: NetworkConnectionError = {
        no: -1,
        code: "-1",
        display_message: "خطا در ارتباط با سرور. شبکه را بررسی کنید",
        message: "network problem",
        name: "network problem"
    }
    return rtn;
}