import * as React from 'react';
import { Input } from 'react-onsenui'
import { InputHTMLAttributes } from 'react';
import './validableinput.scss';

interface IState {
    old_validation_result: boolean
    value: any
}

export interface IProps extends InputHTMLAttributes<'min' | 'max' | 'step'> {
    modifier?: string,
    disabled?: boolean,
    readOnly?: boolean,
    onChange?: (e: React.ChangeEvent<any>) => void,
    onBlur?: (e: React.FocusEvent<any>) => void,
    onFocus?: (e: React.FocusEvent<any>) => void,
    value?: string,
    defaultValue?: string,
    checked?: boolean,
    placeholder?: string,
    type?: string,
    inputId?: string,
    float?: boolean,

    name: string,
    validator_function?: (e: React.ChangeEvent) => boolean,
    onValidatedChange?: (e: React.ChangeEvent, is_valid: boolean) => void

}

class DefinedComponent extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props)
        this.state = { old_validation_result: null, value: this.props.value }
    }

    on_element_change(e: React.ChangeEvent<any>) {
        // debugger;
        let new_state = { ...this.state }

        const new_value = e.target.value
        const is_valid = (this.props.validator_function !== null ? this.props.validator_function(e) : true) && e.target.checkValidity()
        if (this.state.old_validation_result !== is_valid) {

            this.props.onValidatedChange && this.props.onValidatedChange(e, is_valid)
            new_state = { ...new_state, old_validation_result: is_valid}
        }


        new_state = { ...new_state, value: new_value }
        if (this.props.onChange) this.props.onChange(e)
        this.setState(new_state)

    }
    componentDidUpdate(oldProps:IProps) {
        if(this.props.value!=oldProps.value){
            this.setState({
                value: this.props.value
            })
        }
    }
    render() {
        let classnames = this.props.className || '';
        classnames = classnames.replace('error', '')

        if (this.state.old_validation_result == false)
            classnames = classnames + ' error';

        classnames = classnames.replace('validable-input', '') + ' validable-input'
        // debugger;
        return (
            <Input
                {...this.props}
                value={ this.state.value}
                className={classnames}
                onChange={this.on_element_change.bind(this)}
                float
                modifier='material'>
            </Input>
        )

    }
}


export const ValidableInput = DefinedComponent;
