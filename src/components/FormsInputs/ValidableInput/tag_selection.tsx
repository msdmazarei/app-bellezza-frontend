import * as React from 'react'
import { WithContext as ReactTags } from 'react-tag-input';
import './reactTag.scss'

export interface IIdText {
    id: string,
    text: string
}
export interface IProps {
    suggestions: Array<IIdText>
    required?: boolean
    onValidatedChange?: (e: React.ChangeEvent, is_valid: boolean) => void
    onChange?: (e: React.ChangeEvent<any>) => void
    value: Array<IIdText>
    name: string
    label?: string,
    readOnly?: boolean
}

export interface IState {

}


export class TagSelection extends React.Component<IProps, IState> {

    call_change_events(new_tags: IIdText[]) {
        this.props.onChange && this.props.onChange(
            { target: { name: this.props.name, value: new_tags } } as any as React.ChangeEvent
        )
        this.props.onValidatedChange && this.props.onValidatedChange(
            { target: { name: this.props.name, value: new_tags } } as any as React.ChangeEvent, true
        )
    }
    delete_tag(i: number) {
        const new_tags = this.props.value.filter((v, index) => index != i)
        this.call_change_events(new_tags)
    }
    add_tag(tag: IIdText) {
        const new_tags = [...this.props.value, tag]
        this.call_change_events(new_tags)
    }

    render() {
        return (
            <ReactTags tags={this.props.value}
            autocomplete={true}
            placeholder={this.props.label || "نگ ها"}
                suggestions={this.props.suggestions}
                handleDelete={this.delete_tag.bind(this)}
                handleAddition={this.add_tag.bind(this)}
                delimiters={[13, 188]} />
        )
    }

}