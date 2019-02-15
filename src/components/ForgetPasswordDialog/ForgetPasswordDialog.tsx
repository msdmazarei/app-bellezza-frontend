import * as React from 'react'
import { MobileNoInput } from '../FormsInputs/ValidableInput/MobileNoInput';
import { Dialog, Page, Button, Input, Icon, ProgressCircular } from 'react-onsenui';
import { redux_state } from '../../redux/app_state';
import { Dispatch } from 'redux';
import { action_close_forget_password_dialog } from '../../redux/Actions/forget_password';
import { connect } from 'react-redux';

import './css.scss'
import { user_repo } from '../../repositories/user_repo';
import { ValidableInput } from '../FormsInputs/ValidableInput/ValidableInput';
import { PasswordInput } from '../FormsInputs/ValidableInput/PasswordInput';
import { threadId } from 'worker_threads';
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

    step2: {
        counter: number,
        is_tiimer_enable: boolean,
        interval_id: any
    }
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
            is_form_valid: false,
            current_form_name: form_name.step1,
            waiting_for_server_response: false,
            step2: {
                is_tiimer_enable: false,
                counter: 0,
                interval_id: null
            }
        }
    }
    run_step2_interval(nstate: IState) {
        nstate.step2.counter = 59
        nstate.step2.is_tiimer_enable = true
        const that = this
        nstate.step2.interval_id = setInterval(() => {
            let step2_c = { ...that.state.step2 }
            step2_c.counter = step2_c.counter - 1
            if (step2_c.counter <= 0) {
                //stop interval
                clearInterval(step2_c.interval_id)
                step2_c.is_tiimer_enable = false
                step2_c.counter = 0
                that.setState({ ...that.state, step2: { ...step2_c } })
            } else {
                that.setState({ ...that.state, step2: { ...step2_c } })
            }
        }, 1000)

    }
    change_to_step2() {
        let nstate = { ...this.state }
        nstate.current_form_name = form_name.step2
        nstate.waiting_for_server_response = false
        nstate.is_form_valid = false
        this.run_step2_interval(nstate)
        this.setState(nstate)
    }

    forminput_valuechange(e: React.ChangeEvent<any>, is_valid: boolean) {
        let nstate = { ...this.state }
        const fieldname: "username" | "token" | "new_password" = e.target.name;
        nstate[fieldname].value = e.target.value
        nstate[fieldname].is_valid = is_valid
        if (nstate.current_form_name == form_name.step1)
            nstate.is_form_valid = nstate.username.is_valid
        else {
            debugger;
            nstate.is_form_valid = nstate.new_password.is_valid && nstate.token.is_valid
        }
        this.setState(nstate)

    }


    async get_reset_password_token() {
        let nstate = { ...this.state, waiting_for_server_response: true }
        this.setState(nstate)
        try {
            const server_result = await user_repo.get_reset_token(this.state.username.value)
            if (server_result === true) {
                this.change_to_step2()
            } else {
                nstate.waiting_for_server_response = false;
                this.setState(nstate)
            }
        } catch (e) {
            debugger;
            nstate.waiting_for_server_response = false
            this.setState(nstate)
        }

    }
    step_back() {
        if (this.state.current_form_name === form_name.step2) {
            this.setState({ ...this.state, current_form_name: form_name.step1 })
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
                        {this.state.waiting_for_server_response && <ProgressCircular indeterminate />}                      
                        <div className="login-form-buttons">
                            <Button
                                disabled={!this.state.is_form_valid || this.state.waiting_for_server_response}
                                onClick={this.get_reset_password_token.bind(this)}

                            >
                                {!this.state.waiting_for_server_response && `دریافت کد بازنشانی`}
                            </Button>



                            <Button onClick={this.props.close_dialog}>بازگشت</Button>
                        </div>
                    </div>

                    <div className="reset-password-form" hidden={!(this.state.current_form_name == form_name.step2)}>
                        <div>
                            <h5>بازنشانی کلمه عبور</h5>
                            <a onClick={this.step_back.bind(this)}>
                                <Icon className="fa-arrow-right"></Icon>
                            </a>
                        </div>

                        <ValidableInput
                            required
                            minLength={4}
                            name="token"
                            validator_function={() => true}
                            onValidatedChange={this.forminput_valuechange.bind(this)}
                            placeholder="کد بازنشانی">
                        </ValidableInput>

                        <PasswordInput
                            required
                            label="کلمه عبور جدید"
                            name="new_password"
                            onValidatedChange={this.forminput_valuechange.bind(this)}>
                        </PasswordInput>
                        <p hidden={!this.state.step2.is_tiimer_enable}>{this.state.step2.counter}</p>
                        <a hidden={this.state.step2.is_tiimer_enable}> ارسال مجدد پیام کوتاه به   {this.state.username.value}</a>
                        <div className="login-form-buttons">
                            <Button disabled={!this.state.is_form_valid
                                || this.state.waiting_for_server_response} onClick={this.get_reset_password_token.bind(this)}>بازنشانی کلمه عبور</Button>
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