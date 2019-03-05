import * as React from 'react'
import { ValidableInput } from './ValidableInput'

interface IState { }
export interface IProps {
    onValidatedChange?: (e: React.ChangeEvent, is_valid: boolean) => void
    value?: string
    name: string
    label?: string,
    required? : boolean
}

export class ActiveCodeComponent extends React.Component<IProps, IState> {


    is_valid(e: React.ChangeEvent<any>): boolean {
        const value: string = e.target.value || '';
        return /^[0-9]{4}$/.test(value)
        // return value.length == 10;
    }
    render() {

        return (
            <ValidableInput {...this.props} validator_function={this.is_valid.bind(this)} placeholder={this.props.label} ></ValidableInput>
        )
    }
}

export const ActiveCode = ActiveCodeComponent;
