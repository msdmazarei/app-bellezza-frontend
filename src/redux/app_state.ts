import { IUser } from "../models/user";

export interface rstate_forget_password {
    show_dialog: boolean
}
export enum COMPONENT_ROUTE_NAME { 
    POST_NEW_DESIGN="POST_NEW_DESIGN",
    TABS="TABS",
    SPEC_TAG_ITEMS="SPEC_TAG_ITEMS"

}
export interface redux_state {
    signin_dialog_is_shown: boolean
    logged_in_user: IUser
    is_app_sidebar_open: boolean
    current_route: {
        component: COMPONENT_ROUTE_NAME,
        props: any, 
        key?: string
    }

    forget_password: rstate_forget_password
}
