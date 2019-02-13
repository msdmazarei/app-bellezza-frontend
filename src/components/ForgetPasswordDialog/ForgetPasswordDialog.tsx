import * as React from 'react'
import { MobileNoInput } from '../FormsInputs/ValidableInput/MobileNoInput';
import { Dialog, Page, Button, Input } from 'react-onsenui';
import { redux_state } from '../../redux/app_state';
import { Dispatch } from 'redux';
import { action_close_forget_password_dialog } from '../../redux/Actions/forget_password';
import { connect } from 'react-redux';

import './css.scss'
import { user_repo } from '../../repositories/user_repo';
import { ValidableInput } from '../FormsInputs/ValidableInput/ValidableInput';
import { PasswordInput } from '../FormsInputs/ValidableInput/PasswordInput';
enum form_name {
    step1,
    step2
}
export interface IState {
    current_form_name: form_name
    username: {
        is_valid: boolean,
        value: string
    },
    new_password: {
        is_valid: boolean,
        value: string
    },
    token: {
        is_valid: boolean,
        value: string
    }
    is_form_valid: boolean,
    waiting_for_server_response: boolean
}
export interface IProps {
    show?: boolean
    close_dialog?: () => void
}

class Component extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            username: {
                is_valid: null,
                value: null
            },
            new_password: {
                is_valid: null,
                value: null
            },
            token: {
                is_valid: null,
                value: null
            },
            is_form_valid: null,
            current_form_name: form_name.step1,
            waiting_for_server_response: false
        }
    }

    forminput_valuechange(e: React.ChangeEvent<any>, is_valid: boolean) {
        let nstate = { ...this.state }
        const fieldname: "username" = e.target.name;
        nstate[fieldname].value = e.target.value
        nstate[fieldname].is_valid = is_valid
        if (nstate.current_form_name == form_name.step1)
            nstate.is_form_valid = nstate.username.is_valid
        else
            nstate.is_form_valid = nstate.new_password.is_valid && nstate.token.is_valid

        this.setState(nstate)

    }

    async get_reset_password_token() {
        let nstate = { ...this.state, waiting_for_server_response: true }
        this.setState(nstate)
        try {
            debugger;
            const server_result = await user_repo.get_reset_token(this.state.username.value)
            if (server_result === true) {
                nstate.current_form_name = form_name.step2
                nstate.waiting_for_server_response = false
                this.setState(nstate)
            } else {
                nstate.waiting_for_server_response = false;
                this.setState(nstate)
            }
        } catch (e) {
            nstate.waiting_for_server_response = false
            this.setState(nstate)
        }

    }

    render() {
        return (

            <Dialog
                isOpen={this.props.show}
                onCancel={this.props.close_dialog}

                className="forget-password-dialog"
            >

                <Page>
                    <h3>فراموشی رمز عبور</h3>
                    <div className="send_req_send_reset_code" hidden={!(this.state.current_form_name == form_name.step1)}>
                        <h5>مرحله اول - ارسال درخواست</h5>

                        <p className="description">لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه
                            و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد.
                             </p>
                        <MobileNoInput name="username" onValidatedChange={this.forminput_valuechange.bind(this)} required label="شماره همراه"></MobileNoInput>
                        <div className="login-form-buttons">
                            <Button disabled={!this.state.is_form_valid && this.state.waiting_for_server_response} onClick={this.get_reset_password_token.bind(this)}>دریافت کد بازنشانی</Button>
                            <Button onClick={this.props.close_dialog}>بازگشت</Button>
                        </div>
                    </div>

                    <div className="reset-password-form" hidden={!(this.state.current_form_name == form_name.step2)}>
                        <h5>مرحله دوم -  بازنشانی کلمه عبور</h5>

                        <ValidableInput
                            required
                            name="token"
                            onValidatedChange={this.forminput_valuechange.bind(this)}
                            placeholder="کد بازنشانی">
                        </ValidableInput>
                        <PasswordInput
                            required
                            label="کلمه عبور جدید"
                            name="new_password"
                            onValidatedChange={this.forminput_valuechange.bind(this)}></PasswordInput>
                        <p>Counter: 10:10</p>
                        <a> ارسال مجدد پیام کوتاه</a>
                        <div className="login-form-buttons">
                            <Button disabled={!this.state.is_form_valid && this.state.waiting_for_server_response} onClick={this.get_reset_password_token.bind(this)}>بازنشانی کلمه عبور</Button>
                            <Button onClick={this.props.close_dialog}>بازگشت</Button>
                        </div>
                    </div>

                </Page>
            </Dialog>

        )
    }
}


const state2prop = (state: redux_state) => {
    return {
        show: state.forget_password.show_dialog
    }
}

const dispatch2prop = (dispatch: Dispatch) => {
    return {
        close_dialog: () => dispatch(action_close_forget_password_dialog())
    }
}

export const ForgetPasswordDialog = connect(state2prop, dispatch2prop)(Component)