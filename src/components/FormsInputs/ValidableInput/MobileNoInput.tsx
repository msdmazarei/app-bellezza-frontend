import * as React from 'react'
import { ValidableInput } from './ValidableInput'

interface IState { }
export interface IProps {
    required?: boolean
    onValidatedChange?: (e: React.ChangeEvent, is_valid: boolean) => void
    onChange?: (e: React.ChangeEvent<any>) => void
    value?: string
    name: string
    label?: string,
    readOnly? : boolean
}

export class MobileComponent extends React.Component<IProps, IState> {


    is_valid(e: React.ChangeEvent<any>): boolean {
        const value: string = e.target.value || '';
        return /^09[0123][0-9]{8}$/.test(value)
        // return value.length == 10;
    }
    render() {

        return (
            <ValidableInput {...this.props} validator_function={this.is_valid.bind(this)} placeholder={this.props.label} ></ValidableInput>
        )
    }
}

export const MobileNoInput = MobileComponent;
