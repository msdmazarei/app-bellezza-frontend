import * as ons from 'onsenui';
import * as React from 'react';

import { Navigator, BottomToolbar, Button } from 'react-onsenui'
import { ninvoke } from 'q';
import { IGeneralPageState, GeneralPage, IGeneralPageProps } from '../GeneralPage';
import { ValidableInput } from '../FormsInputs/ValidableInput/ValidableInput';
import { Dispatch } from 'redux';
import { action_open_app_sidebar, action_close_app_sidebar } from '../../redux/Actions/app_sidebar';
import { redux_state } from '../../redux/app_state';
import { connect } from 'react-redux';
import ReactImageUploadComponent from 'react-images-upload'
import { ImageInput } from '../FormsInputs/ValidableInput/ImageUploader';
import { Z_FIXED } from 'zlib';
import { FooterButtons } from '../FooterButtons/index';
import { toast_error, toast_message } from '../../utils';
import { post_repo } from '../../repositories/post_repo';
import { IUser } from '../../models/user';


export interface ISpecTagPageState extends IGeneralPageState {
    title: {
        is_valid: boolean,
        value: string
    },

    description: {
        is_valid: boolean,
        value: string
    },

    images: {
        is_valid: boolean,
        value: Array<any>
    }

    is_form_valid: boolean
    wait_to_server_response: boolean
}

export interface IProps extends IGeneralPageProps {
    LoggedInUser: IUser
}

export class Component extends GeneralPage<IProps, ISpecTagPageState> {
    constructor(props: IProps) {
        debugger;
        super(props)
        this.state = {
            page_title: "طرح جدید ",
            page_name: "tag_page",
            title: {
                is_valid: null,
                value: null
            },
            description: {
                is_valid: null,
                value: null
            },
            images: {
                is_valid: null,
                value: []
            },
            is_form_valid: null,
            wait_to_server_response: false
        }
    }

    // onDrop(picture: any) {
    //     this.setState({
    //         ...this.state,
    //         pictures: this.state.pictures.concat(picture),
    //     });
    // }

    form_input_validation_changed(e: React.ChangeEvent<any>, is_valid: boolean) {
        console.log("forminput_valuechange called.")
        debugger;
        let nstate = { ...this.state }
        const fieldname: "title" | "description" | "images" = e.target.name;
        nstate[fieldname].value = e.target.value
        nstate[fieldname].is_valid = is_valid || nstate[fieldname].is_valid
        nstate.is_form_valid = this.state.title.is_valid && this.state.images.is_valid &&
            (this.state.images.value || []).length > 0
        this.setState(nstate)
    }
    async save() {
        debugger;
        try {
            this.setState({ ...this.state, wait_to_server_response: true })
            const res = await post_repo.new_post(this.props.LoggedInUser,
                this.state.title.value,
                this.state.description.value,
                this.state.images.value)
            toast_message("پست جدید با موفقیت ذخیره شد.", 3000)
            this.setState({ ...this.state, wait_to_server_response: false })

        } catch (e) {
            this.setState({ ...this.state, wait_to_server_response: false })
            toast_error(e)
        }
    }
    get_internal_page_content(): React.ReactElement<any> {
        return (
            <div>
                <ValidableInput
                    placeholder="عنوان"
                    name="title"
                    required
                    onValidatedChange={this.form_input_validation_changed.bind(this)}
                    onChange={this.form_input_validation_changed.bind(this)}
                    validator_function={() => true}
                    value={this.state.title.value}

                ></ValidableInput>

                <ValidableInput name="description"
                    placeholder="توضیحات"
                    onValidatedChange={this.form_input_validation_changed.bind(this)}
                    value={this.state.description.value}
                    onChange={this.form_input_validation_changed.bind(this)}
                    validator_function={() => true}

                    type="textarea"
                ></ValidableInput>

                <ImageInput
                    label="بازگذاری تصاویر"
                    onValidatedChange={this.form_input_validation_changed.bind(this)}
                    onChange={this.form_input_validation_changed.bind(this)}
                    name="images"
                >



                </ImageInput>
                <div style={{ height: "100px" }}></div>
                {/* <ReactImageUploadComponent 
                 withPreview
                 withIcon={false}
                 buttonText="انتخاب تصاویر"
                 label="برروی دکمه زیر کلیک کنید و از میان تصاویر موجود روی دستگاه تان عکس هایی را که می خواهید بارگذاری کنید."
                 fileSizeError="حجم عکس انتخابی بیش از مقدار مجاز است."
                 fileTypeError="این قالب عکس پشتیبانی نمی شود"
                 onChange={this.onDrop.bind(this)}
                 imgExtension={['.jpg', '.gif', '.png', '.gif']}
                 maxFileSize={5242880}
                 className="msd-upload-image"
                >

                </ReactImageUploadComponent> */}

                <FooterButtons>
                    <Button
                        disabled={!(this.state.is_form_valid && this.state.wait_to_server_response == false)}
                        onClick={this.save.bind(this)}
                    >ذخیره</Button>
                    <Button>بازگشت</Button>
                </FooterButtons>

            </div>
        )
    }

}


const dispatch2props = (dispatch: Dispatch) => {
    return {
        open_app_sidebar: () => dispatch(action_open_app_sidebar()),
        close_app_sidebar: () => dispatch(action_close_app_sidebar())

    }
}

const state2props = (state: redux_state) => {
    return {
        is_app_sidebar_open: state.is_app_sidebar_open,
        LoggedInUser: state.logged_in_user
    }
}



export const PostNewDesign = connect(state2props, dispatch2props)(Component);

