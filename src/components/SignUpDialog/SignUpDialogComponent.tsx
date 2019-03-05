import * as React from 'react'
import { redux_state } from '../../redux/app_state';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { action_close_app_sidebar } from '../../redux/Actions/app_sidebar';
import { Dialog, Page, Button } from 'react-onsenui'
import { MobileNoInput } from '../FormsInputs/ValidableInput/MobileNoInput';
import { action_close_signup_dialog } from '../../redux/Actions/signup';
import { user_repo } from '../../repositories/user_repo';
import { toast_error, toast_message } from '../../utils';
import { ActiveCode } from '../FormsInputs/ValidableInput/ActiveCode';
import { ValidableInput } from '../FormsInputs/ValidableInput/ValidableInput';
import { PasswordInput } from '../FormsInputs/ValidableInput/PasswordInput';
import './signup.scss'
enum register_step {
    before_active_code = "before_active_code",
    after_active_code = "after_active_code"
}
interface Ifield<T> {
    is_valid: boolean,
    value: T
}
export interface IState {

    step: register_step

    mobile: Ifield<string>
    name: Ifield<string>

    active_code: Ifield<string>

    password: Ifield<string>
    password_repeat: Ifield<string>

    is_form_valid: boolean
    waiting_to_server_response: boolean

    server_exception: {
        show: boolean
        message: string
    }

}
export interface IProps {
    show?: boolean
    onClose?: () => void
    close_app_sidebar?: () => void
}

class SignUpDialogComponent extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            mobile: {
                is_valid: true,
                value: null
            },
            password: {
                is_valid: null,
                value: null
            },
            password_repeat: {
                is_valid: null,
                value: null
            },
            active_code: {
                is_valid: null,
                value: null
            },
            name: {
                is_valid: null,
                value: null
            },
            is_form_valid: null,
            waiting_to_server_response: false,
            server_exception: {
                message: null,
                show: null
            },
            step: register_step.before_active_code

        }
    }
    forminput_valuechange(e: React.ChangeEvent<any>, is_valid: boolean) {
        console.log("forminput_valuechange called.")
        let nstate = { ...this.state }
        const fieldname: "mobile" | "password" | "active_code" | "name" | "password_repeat" = e.target.name;
        nstate[fieldname].value = e.target.value
        nstate[fieldname].is_valid = is_valid || nstate[fieldname].is_valid

        if (this.state.step == register_step.before_active_code) {
            nstate.is_form_valid = nstate.mobile.is_valid
        } else {
            console.log("p = pr -> ", (nstate.password.value === nstate.password_repeat.value))
            nstate.is_form_valid =
                nstate.mobile.is_valid && nstate.password.is_valid &&
                nstate.active_code.is_valid && nstate.password_repeat.is_valid &&

                (nstate.password.value === nstate.password_repeat.value)
        }

        this.setState(nstate)

    }
    reset_field(): Ifield<string> {
        return {
            is_valid: null,
            value: null
        }
    }
    reset_form() {
        this.setState({
            step: register_step.before_active_code,

            mobile: this.reset_field(),
            name: this.reset_field(),

            password: this.reset_field(),
            password_repeat: this.reset_field(),


            active_code: this.reset_field(),
        })
    }
    onClose() {
        this.reset_form()

        this.props.onClose && this.props.onClose()
    }
    async request_active_code() {

        try {
            const promise = user_repo.send_register_code(this.state.mobile.value)
            this.setState({ ...this.state, waiting_to_server_response: true })
            const result = await promise
            this.setState({
                ...this.state,
                waiting_to_server_response: false,
                step: register_step.after_active_code
            })

        } catch (e) {

            toast_error(e)
            this.setState({ ...this.state, waiting_to_server_response: false })
        }
    }
    async register() {
        try {
            const promise = user_repo.register(this.state.mobile.value, this.state.active_code.value, this.state.name.value, this.state.password.value)
            this.setState({ ...this.state, waiting_to_server_response: true })

            const result = await promise

            this.setState({
                ...this.state,
                waiting_to_server_response: false,
            })

            this.props.onClose && this.props.onClose()
            toast_message("ثبت نام با موفقیت انجام شد", 3000)

        } catch (e) {

            toast_error(e)
            this.setState({ ...this.state, waiting_to_server_response: false })
        }
    }
    render() {
        return (

            <Dialog
                isOpen={this.props.show}
                onCancel={this.onClose.bind(this)}
                className="sign-up-dialog"
            >

                <Page>
                    <h3>ثبت نام</h3>
                    <div className="before-active-code"
                        hidden={this.state.step != register_step.before_active_code}>
                        <p>برای دریافت کد فعال سازی شماره همراه خود را وارد کنید</p>
                        <MobileNoInput
                            value={this.state.mobile.value}
                            name="mobile"
                            onValidatedChange={this.forminput_valuechange.bind(this)}
                            required
                            label="شماره همراه">
                        </MobileNoInput>
                        <div className="buttons" >
                            <Button disabled={!this.state.is_form_valid || this.state.waiting_to_server_response}
                                onClick={this.request_active_code.bind(this)}>ارسال کد</Button>
                            <Button onClick={this.onClose.bind(this)}>بازگشت</Button>
                        </div>

                    </div>
                    <div className="after-active-code"
                        hidden={this.state.step != register_step.after_active_code}>


                        <p>بعد از دریافت کد فعال سازی با پر کردن اطلاعات ذیل ثبت نام خود را کامل کنید</p>
                        <MobileNoInput
                            onValidatedChange={this.forminput_valuechange.bind(this)}

                            value={this.state.mobile.value}
                            name="mobile"
                            required
                            label="شماره همراه"
                            readOnly={true}
                        >
                        </MobileNoInput>

                        <ActiveCode name="active_code"

                            onValidatedChange={this.forminput_valuechange.bind(this)}
                            label="کد پیامک"
                            required
                        ></ActiveCode>
                        <ValidableInput
                            required
                            name="name"
                            placeholder="نام"
                            validator_function={(e) => true}
                            onValidatedChange={this.forminput_valuechange.bind(this)}
                            onChange={this.forminput_valuechange.bind(this)}
                        ></ValidableInput>

                        <PasswordInput name="password" label="کلمه عبور" required
                            onValidatedChange={this.forminput_valuechange.bind(this)}
                            onChange={this.forminput_valuechange.bind(this)}
                        ></PasswordInput>

                        <PasswordInput
                            name="password_repeat"
                            label="تکرار کلمه عبور"
                            required
                            onValidatedChange={this.forminput_valuechange.bind(this)}
                            onChange={this.forminput_valuechange.bind(this)}
                        >
                        </PasswordInput>



                        <div className="buttons">
                            <Button disabled={!this.state.is_form_valid || this.state.waiting_to_server_response}
                                onClick={this.register.bind(this)}>ثبت نام</Button>
                            <Button onClick={this.onClose.bind(this)}>بازگشت</Button>
                        </div>
                    </div>

                    {/* <ForgetPasswordDialog></ForgetPasswordDialog> */}
                    {/* <Toast isOpen={this.state.server_exception.show}>{this.state.server_exception.message}</Toast> */}
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
        onClose: () => dispatch(action_close_signup_dialog()),
    }
}

export const SignUpDialog = connect(state2props, dispatch2props)(SignUpDialogComponent);