import { UnAuthenticated } from '../exceptions/UnAuthenticated'
import { func } from 'prop-types';
import { InternalServerError } from '../exceptions/InternalServerError';
import { NetworkConnectionError } from '../exceptions/NetworkConnectionError';
import { UserAlreadyExists } from '../exceptions/UserAlreadyExists';
import { ItsVerySoonToTry } from '../exceptions/ItsVerySoonToTry';
import { BaseError } from '../exceptions/BaseError';

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


export function internal_server_error(): InternalServerError {
    const rtn: InternalServerError = {
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

export function user_already_exist(): UserAlreadyExists {
    const rtn: UserAlreadyExists = {
        no: -1,
        code: "409",
        display_message: "این شماره قبلا ثبت نام شده است.",
        message: "user already exists",
        name: "user already exists"
    }
    return rtn;
}

export function its_very_soon_to_try(): ItsVerySoonToTry {
    const rtn: ItsVerySoonToTry = {
        no: -1,
        code: "403",
        display_message: "کد به تازگی برای شما ارسال شده لطفا کمی صبر کنید",
        message: "its very soon to try",
        name: "its very soon to try"
    }
    return rtn;
}

export function general_error(no: number, name: string, msg: string): BaseError {
    return {
        no: no,
        code: no.toString(),
        display_message: msg,
        name: name,
        message: name
    }
}