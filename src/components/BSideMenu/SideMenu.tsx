import * as React from 'react';
import { Dispatch } from 'redux'
import { MapDispatchToProps, MapStateToProps, connect } from 'react-redux'
import { Page, List, ListHeader, ListItem, Icon } from 'react-onsenui';
import { LoginDialog } from '../SignInDialog/SignInDialogComponent';
import { action_login_dialog_closed, action_show_login_dialog } from '../../redux/Actions/login';
import { EACTIONS } from '../../redux/ActionsEnum';
import { redux_state } from '../../redux/app_state';
import { action_close_app_sidebar } from '../../redux/Actions/app_sidebar';
import { ForgetPasswordDialog } from '../ForgetPasswordDialog/ForgetPasswordDialog';


export interface IProps { 
    signin_dialog_is_shown?: boolean, 
    dialog_closed?: () => void, 
    show_signin_dialog?: () => void 
    close_app_sidebar?: () => void
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

    render() {
        return (
            <Page className="msd-main-menu">
                <List>
                    <ListHeader>منوی اصلی</ListHeader>
                    <ListItem key="login" onClick={this.login_menu.bind(this)}>
                        <Icon className="fa-sign-in-alt" ></Icon>
                        <span>ورود</span>
                    </ListItem>
                    <ListItem>
                        <Icon className="fa-user-plus"></Icon>
                        <span>ثبت نام</span>
                    </ListItem>

                    <ListItem>
                        <Icon className="fa-info-circle"></Icon>
                        <span> درباره ما</span>
                    </ListItem>

                </List>

                <LoginDialog show={this.props.signin_dialog_is_shown} onClose={this.props.dialog_closed}></LoginDialog>
                <ForgetPasswordDialog></ForgetPasswordDialog>
            </Page>
        )
    }
}



const dispatch2props: MapDispatchToProps<{}, {}> = (dispatch: Dispatch) => {
    return {
        dialog_closed: () => dispatch(action_login_dialog_closed()),
        show_signin_dialog: () => dispatch(action_show_login_dialog()),
        close_app_sidebar: () => dispatch(action_close_app_sidebar())
    }
}

const state2props: MapStateToProps<{ signin_dialog_is_shown?: boolean }, { signin_dialog_is_shown?: boolean }, redux_state> = (state: redux_state) => {
    return {
        signin_dialog_is_shown: state.signin_dialog_is_shown
    }
}




export const SideMenu = connect(state2props, dispatch2props)(Component);
