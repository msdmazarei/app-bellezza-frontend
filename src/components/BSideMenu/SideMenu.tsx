import * as React from 'react';
import { Dispatch } from 'redux'
import { MapDispatchToProps, MapStateToProps, connect } from 'react-redux'
import { Page, List, ListHeader, ListItem, Icon, Navigator } from 'react-onsenui';
import { LoginDialog } from '../SignInDialog/SignInDialogComponent';
import { action_login_dialog_closed, action_show_login_dialog } from '../../redux/Actions/login';
import { EACTIONS } from '../../redux/ActionsEnum';
import { redux_state, COMPONENT_ROUTE_NAME } from '../../redux/app_state';
import { action_close_app_sidebar } from '../../redux/Actions/app_sidebar';
import { ForgetPasswordDialog } from '../ForgetPasswordDialog/ForgetPasswordDialog';
import { IUser } from '../../models/user';
import { action_user_logged_out } from '../../redux/Actions/user';
import { toast_error, toast_message } from '../../utils';
import { user_repo } from '../../repositories/user_repo';
import { IRouteConfig } from '../../redux/Actions/route';
import { SignUpDialog } from '../SignUpDialog/SignUpDialogComponent';
import { action_close_signup_dialog, action_show_signup_dialog } from '../../redux/Actions/signup';
// import { PostNewDesign } from '../PostNewDesign/post_new_design';


export interface IProps {
    navigator: Navigator,
    signin_dialog_is_shown?: boolean,
    signup_dialog_is_shown?: boolean,
    logged_in_user?: IUser,
    dialog_closed?: () => void,
    signup_dialog_close?: () => void,
    show_signin_dialog?: () => void
    close_app_sidebar?: () => void
    do_logout?: () => void,
    open_signup_dialog?: () => void,
    change_app_route: (route: IRouteConfig)=> void
}
export interface IState { }

class Component extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props)
    }

    login_menu() {
        this.props.close_app_sidebar && this.props.close_app_sidebar()
        this.props.show_signin_dialog && this.props.show_signin_dialog()
    }
    open_signup_dialog() {
        this.props.close_app_sidebar && this.props.close_app_sidebar()
        this.props.open_signup_dialog && this.props.open_signup_dialog()
    }

    async logout_menu() {
        try {
            await user_repo.logout(this.props.logged_in_user.username)
            this.props.do_logout && this.props.do_logout()
            toast_message('خروچ انجام شد.', 3000)
        } catch (e) {
            toast_error(e)
        }
    }

    close_app_sidebar() {
        this.props.close_app_sidebar && this.props.close_app_sidebar();

    }

    goto_post_new_design() {
        this.props.change_app_route && this.props.change_app_route({
            target_component: COMPONENT_ROUTE_NAME.POST_NEW_DESIGN,
            props: {}
        })
        this.close_app_sidebar()
    }

    render() {
        let menu_items = [

            <ListItem key="login" onClick={this.login_menu.bind(this)}>
                <Icon className="fa-sign-in-alt" ></Icon>
                <span>ورود</span>
            </ListItem>,
            <ListItem key="register" onClick={this.open_signup_dialog.bind(this)}>
                <Icon className="fa-user-plus"></Icon>
                <span>ثبت نام</span>
            </ListItem>,
            <ListItem key="about_us">
                <Icon className="fa-info-circle"></Icon>
                <span> درباره ما</span>
            </ListItem>
        ]
        if (this.props.logged_in_user) {
            menu_items = [
                <ListItem key="login" onClick={this.login_menu.bind(this)}>
                    <Icon className="fa-sign-in-alt" ></Icon>
                    <span>پیام های مستفیم</span>
                </ListItem>,
                <ListItem key="new_post" onClick={this.goto_post_new_design.bind(this)}>
                    <span>طرح جدید</span>
                </ListItem>,
                <ListItem key="posts">
                    <Icon className="fa-user-plus"></Icon>
                    <span>نوشته ها و طرح ها</span>
                </ListItem>,
                <ListItem key="notifs">
                    <span>آخرین رخدادها</span>
                </ListItem>,
                <ListItem key="logout" onClick={this.logout_menu.bind(this)}>
                    <Icon className="fa-user-plus"></Icon>
                    <span>خروج</span>
                </ListItem>,
                <ListItem key="about_us">
                    <Icon className="fa-info-circle"></Icon>
                    <span> درباره ما</span>
                </ListItem>
            ]
        }
        return (
            <Page className="msd-main-menu">

                <List>
                    <ListHeader>منوی اصلی</ListHeader>
                    {menu_items.map(x => x)}

                </List>

                <LoginDialog show={this.props.signin_dialog_is_shown} onClose={this.props.dialog_closed}></LoginDialog>
                <SignUpDialog show={this.props.signup_dialog_is_shown}></SignUpDialog>
                <ForgetPasswordDialog></ForgetPasswordDialog>
            </Page>
        )
    }
}



const dispatch2props: MapDispatchToProps<{}, {}> = (dispatch: Dispatch) => {
    return {
        dialog_closed: () => dispatch(action_login_dialog_closed()),
        show_signin_dialog: () => dispatch(action_show_login_dialog()),
        close_app_sidebar: () => dispatch(action_close_app_sidebar()),
        do_logout: () => dispatch(action_user_logged_out()),
        open_signup_dialog: () => dispatch(action_show_signup_dialog())
    }
}

const state2props = (state: redux_state) => {
    return {
        signin_dialog_is_shown: state.signin_dialog_is_shown,
        signup_dialog_is_shown: state.signup_dialog_is_shown,
        logged_in_user: state.logged_in_user
    }
}




export const SideMenu = connect(state2props, dispatch2props)(Component);
