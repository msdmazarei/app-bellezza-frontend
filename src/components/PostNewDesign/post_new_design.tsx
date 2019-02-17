import * as ons from 'onsenui';
import * as React from 'react';

import { Navigator, BottomToolbar, Button} from 'react-onsenui'
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
}

export interface IProps extends IGeneralPageProps {

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
            }
        }
    }

    // onDrop(picture: any) {
    //     this.setState({
    //         ...this.state,
    //         pictures: this.state.pictures.concat(picture),
    //     });
    // }

    form_input_validation_changed(e: React.ChangeEvent<any>, is_valid: boolean) {
        debugger;
    }

    get_internal_page_content(): React.ReactElement<any> {
        return (
            <div>
                <ValidableInput
                    placeholder="عنوان"
                    name="title"
                    required
                    onValidatedChange={this.form_input_validation_changed.bind(this)}
                    value={this.state.title.value}

                ></ValidableInput>

                <ValidableInput name="description"
                    placeholder="توضیحات"
                    onValidatedChange={this.form_input_validation_changed.bind(this)}
                    value={this.state.description.value}
                    type="textarea"
                ></ValidableInput>

                <ImageInput
                    label="بازگذاری تصاویر"
                    onValidatedChange={this.form_input_validation_changed.bind(this)}
                    name="images"
                >

                

                </ImageInput>
                <div style={{height:"100px"}}></div>
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
                    <Button>ذخیره</Button>
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
        is_app_sidebar_open: state.is_app_sidebar_open
    }
}



export const PostNewDesign = connect(state2props, dispatch2props)(Component);

