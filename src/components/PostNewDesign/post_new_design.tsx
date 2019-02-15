import * as ons from 'onsenui';
import * as React from 'react';

import { Navigator } from 'react-onsenui'
import { ninvoke } from 'q';
import { IGeneralPageState, GeneralPage, IGeneralPageProps } from '../GeneralPage';
import { ValidableInput } from '../FormsInputs/ValidableInput/ValidableInput';
import { Dispatch } from 'redux';
import { action_open_app_sidebar, action_close_app_sidebar } from '../../redux/Actions/app_sidebar';
import { redux_state } from '../../redux/app_state';
import { connect } from 'react-redux';
export interface ISpecTagPageState extends IGeneralPageState {
    title: {
        is_valid: boolean,
        value: string
    },

    description: {
        is_valid: boolean,
        value: string
    },

    images: []
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
            images: []
        }
    }


    form_input_validation_changed(e: React.ChangeEvent<any>, is_valid: boolean) {

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

