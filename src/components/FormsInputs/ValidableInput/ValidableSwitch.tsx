import * as React from 'react'
import { WithContext as ReactTags } from 'react-tag-input';
import './reactTag.scss'
import { Switch } from 'react-onsenui';
import './validable_switch.scss'
export interface IIdText {
    id: string,
    text: string
}
export interface IProps {
    required?: boolean
    onValidatedChange?: (e: React.ChangeEvent, is_valid: boolean) => void
    onChange?: (e: React.ChangeEvent<any>) => void
    name: string
    label?: string,
    readOnly?: boolean,
    value?: boolean
}

export interface IState {

}


export class ValidableSwitch extends React.Component<IProps, IState> {

    call_change_events(value: any) {
        this.props.onChange && this.props.onChange(
            { target: { name: this.props.name, value: value.value } } as any as React.ChangeEvent
        )
        this.props.onValidatedChange && this.props.onValidatedChange(
            { target: { name: this.props.name, value: value.value } } as any as React.ChangeEvent, true
        )
    }


    render() {
        return (
            <div className="validable-switch">
                <span>{this.props.label}</span>
                <Switch 
                className="switch"
                checked={this.props.value} 
                onChange={this.call_change_events.bind(this)} />

            </div>
        )
    }

}