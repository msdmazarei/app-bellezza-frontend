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

export class Component extends React.Component<IProps, IState> {


    is_valid(e: React.ChangeEvent<any>): boolean {
      return true
    }
    render() {

        return (
            <ValidableInput {...this.props} validator_function={this.is_valid.bind(this)} placeholder={this.props.label} type="password"></ValidableInput>
        )
    }
}

export const PasswordInput = Component;
