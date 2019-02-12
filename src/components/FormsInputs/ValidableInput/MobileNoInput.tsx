import * as React from 'react'
import { ValidableInput } from './ValidableInput'

interface IState { }
export interface IProps {
    required?: boolean
    onValidatedChange?: (e: React.ChangeEvent, is_valid: boolean) => void
    value?: string
    name: string
    label?: string
}

export class MobileComponent extends React.Component<IProps, IState> {


    is_valid(e: React.ChangeEvent<any>): boolean {
        const value: string = e.target.value || '';
        return value.length == 10;
    }
    render() {

        return (
            <ValidableInput {...this.props} validator_function={this.is_valid.bind(this)} placeholder={this.props.label}></ValidableInput>
        )
    }
}

export const MobileNoInput = MobileComponent;
