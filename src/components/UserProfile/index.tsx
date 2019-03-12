import * as React from 'react'
import { IGeneralPageProps, IGeneralPageState, GeneralPage } from '../GeneralPage';
import { event } from '../../models/event';
import { Event } from '../Event/index'
import { event_repo as repo } from '../../repositories/event_repo';
import * as InfiniteScroll from 'react-infinite-scroll-component';
import { toast_error } from '../../utils';
import { IUser } from '../../models/user';

import './index.scss'
import { MapDispatchToProps, connect } from 'react-redux';
import { Dispatch } from 'redux';
// import { action_login_dialog_closed, action_show_login_dialog } from '../../redux/Actions/login';
import { action_close_app_sidebar, action_open_app_sidebar } from '../../redux/Actions/app_sidebar';
// import { action_user_logged_out } from '../../redux/Actions/user';
// import { action_show_signup_dialog } from '../../redux/Actions/signup';
import { redux_state } from '../../redux/app_state';
import { user_repo } from '../../repositories/user_repo';
import { ValidableInput } from '../FormsInputs/ValidableInput/ValidableInput';
import { Button, Switch } from 'react-onsenui';
import { ValidableSwitch } from '../FormsInputs/ValidableInput/ValidableSwitch';
import { SingleImageUploader } from '../FormsInputs/ValidableInput/SingeImageUploader'

interface Ifield<T> {
    is_valid: boolean,
    value: T
}


export interface IState extends IGeneralPageState {
    name: Ifield<string>
    bio: Ifield<string>
    title: Ifield<string>
    profileImage: Ifield<any>
    is_form_valid: boolean
    waiting_to_server_response: boolean
    i_am_designer: Ifield<boolean>
    i_have_meseon: Ifield<boolean>
}

export interface IProps extends IGeneralPageProps {
    user: IUser
}

class Component extends GeneralPage<IProps, IState> {
    scrollParentRef: any = null;
    item_load_count: number = 10;

    constructor(props: IProps) {
        super(props)
        this.state = {
            page_name: "user_profile",
            page_title: "پروفایل",
            name: {
                is_valid: true,
                value: null
            },
            title: {
                is_valid: true,
                value: null
            },
            bio: {
                is_valid: true,
                value: null
            },
            profileImage:  {
                is_valid: true,
                value: null
            },
            i_am_designer: { is_valid: true, value: null },
            i_have_meseon: { is_valid: true, value: null },
            waiting_to_server_response: false,

            is_form_valid: null
        }
    }


    forminput_valuechange(e: React.ChangeEvent<any>, is_valid: boolean) {
        console.log("forminput_valuechange called.",e)
        let nstate = { ...this.state }
        const fieldname: "name" | "bio" | "title" | "i_am_designer" | "i_have_meseon" | "profileImage" = e.target.name;
        nstate[fieldname].value = e.target.value
        nstate[fieldname].is_valid = is_valid || nstate[fieldname].is_valid

        nstate.is_form_valid = nstate.name.is_valid && nstate.bio.is_valid && nstate.title.is_valid
        this.setState(nstate)

    }


    async save() {

    }
    get_internal_page_content(): React.ReactElement<any> {
        debugger;
        return (

            // <div style={{height:"300px" , "overflow": "auto" }}
            // ref={(ref) => this.scrollParentRef = ref}
            // >
            <div className="profile">
                <SingleImageUploader name="profileImage"
                 onChange={this.forminput_valuechange.bind(this)}
                ></SingleImageUploader>
                <ValidableInput
                    placeholder="نام"
                    name="name"
                    validator_function={() => true}
                    required
                    onChange={this.forminput_valuechange.bind(this)}
                    value={this.props.user.name}>
                </ValidableInput>
                <ValidableInput
                    placeholder="عنوان"
                    name="title"
                    validator_function={() => true}
                    onChange={this.forminput_valuechange.bind(this)}
                    value={this.props.user.title}>
                </ValidableInput>

                <ValidableInput
                    placeholder="معرفی"
                    name="bio"
                    validator_function={() => true}
                    onChange={this.forminput_valuechange.bind(this)}
                    value={this.props.user.bio}>
                </ValidableInput>
                <ValidableSwitch
                    label="طراح هستم و دوست دارم در سامانه معرفی شوم"
                    value={this.state.i_am_designer.value}
                    onChange={this.forminput_valuechange.bind(this)}
                    name="i_am_designer"
                >
                </ValidableSwitch>

                <ValidableSwitch
                    label="مزون دارم و دوست دارم در سامانه معرفی شوم."
                    value={this.state.i_have_meseon.value}
                    onChange={this.forminput_valuechange.bind(this)}
                    name="i_have_meseon"
                >
                </ValidableSwitch>
                <div className="buttons">
                    <Button disabled={!this.state.is_form_valid || this.state.waiting_to_server_response}
                        onClick={this.save.bind(this)}>ثبت</Button>
                </div>
            </div>

        )
    }
}

const dispatch2props: MapDispatchToProps<{}, {}> = (dispatch: Dispatch) => {
    return {
        open_app_sidebar: () => dispatch(action_open_app_sidebar()),
        close_app_sidebar: () => dispatch(action_close_app_sidebar())

    }
}

const state2props = (state: redux_state) => {
    return {
        user: state.logged_in_user,
        is_app_sidebar_open: state.is_app_sidebar_open,

    }
}




export const UserProfile = connect(state2props, dispatch2props)(Component);


