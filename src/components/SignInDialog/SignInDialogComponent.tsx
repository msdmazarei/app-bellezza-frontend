import * as React from 'react'
import { Dialog, Page, Button } from 'react-onsenui'
import { IUser } from '../../models/user';
import { MobileNoInput } from '../FormsInputs/ValidableInput/MobileNoInput';
import { ValidableInput } from '../FormsInputs/ValidableInput/ValidableInput';
import { PasswordInput } from '../FormsInputs/ValidableInput/PasswordInput';
import './signindialog.scss'
import { redux_state } from '../../redux/app_state';
import { Dispatch } from 'redux';
import { action_close_app_sidebar } from '../../redux/Actions/app_sidebar';
import { connect } from 'react-redux';
import { ForgetPasswordDialog } from '../ForgetPasswordDialog/ForgetPasswordDialog';
import { action_open_forget_password_dialog } from '../../redux/Actions/forget_password';
export interface IState {
    username: {
        is_valid: boolean
        value: string
    }

    password: {
        is_valid: boolean
        value: string
    }

    is_login_form_valid: boolean

}
export interface IProps {
    show?: boolean
    onClose?: () => void
    doLogin?: (username: string, password: string) => Promise<IUser>
    close_app_sidebar?: () => void
    show_forget_password_dialog?: () => void

}

class LoginDialogComponent extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props)
        this.state = {
            username: this.init_field(),
            password: this.init_field(),
            is_login_form_valid: null
        }
    }

    init_field(): { is_valid: boolean, value: string } {
        return { is_valid: null, value: null }
    }
    onClose() {
        this.props.onClose && this.props.onClose()

    }

    forminput_valuechange(e: React.ChangeEvent<any>, is_valid: boolean) {
        let nstate = { ...this.state }
        const fieldname: "username" | "password" = e.target.name;
        nstate[fieldname].value = e.target.value
        nstate[fieldname].is_valid = is_valid
        nstate.is_login_form_valid = nstate.username.is_valid && nstate.password.is_valid

        this.setState(nstate)

    }

    async login() {

    }
    forget_password(){
        this.onClose()
        this.props.show_forget_password_dialog && this.props.show_forget_password_dialog()
    }
    render() {
        return (

            <Dialog
                isOpen={this.props.show}
                onCancel={this.onClose.bind(this)}

                className="sign-in-dialog"
            >

                <Page>
                    <h3>ورود</h3>
                    <MobileNoInput name="username" onValidatedChange={this.forminput_valuechange.bind(this)} required label="شماره همراه"></MobileNoInput>
                    <PasswordInput name="password" onValidatedChange={this.forminput_valuechange.bind(this)} required label="کامه عبور"></PasswordInput>
                    <a onClick={this.forget_password.bind(this)} className="i-forget-my-pass"> رمز عبورم را فراموش کرده ام.</a>

                    <div className="login-form-buttons">
                        <Button disabled={!this.state.is_login_form_valid} onClick={this.login.bind(this)}>ورود</Button>
                        <Button onClick={this.onClose.bind(this)}>بازگشت</Button>
                    </div>

                    {/* <ForgetPasswordDialog></ForgetPasswordDialog> */}
                </Page>
            </Dialog>

        )
    }

}

const state2props = (state: redux_state) => {
    return {}
}

const dispatch2props = (dispatch: Dispatch) => {
    return {
        close_app_sidebar: () => dispatch(action_close_app_sidebar()),
        show_forget_password_dialog: () => dispatch(action_open_forget_password_dialog())
    }
}

export const LoginDialog = connect(state2props, dispatch2props)(LoginDialogComponent);