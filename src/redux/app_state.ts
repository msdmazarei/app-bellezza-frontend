import { IUser } from "../models/user";

export interface rstate_forget_password {
    show_dialog: boolean
}
export interface redux_state {
    signin_dialog_is_shown: boolean
    logged_in_user: IUser
    is_app_sidebar_open: boolean

    forget_password: rstate_forget_password
}
