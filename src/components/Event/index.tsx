import * as React from 'react'
import { event } from '../../models/event'
import { UserAvatar, UserViewType } from '../UserAvatar/UserAvatar';
import './index.scss'
export interface IProps {
    model: event
}
export interface IState {

}
export class Component extends React.Component<IProps, IState> {
    translate_action() {
        switch (this.props.model.action.toLowerCase()) {
            case "like":
                return "پست را پسندید"
            case "dislike":
                return "از پسندیدنش پشیمان شد"
            case "comment":
                return "یادداشت گذاشت"
            case "recomment":
                return "یادداشتش را ویرایش کرد"
            case "discomment":
                return "یادداشتش را حذف کرد"
            case "add":
                return "پیام خصوصی فرستاد"
            case "delete":
                return "پیام خصوصی را حذف کرد"

            default:
                return "رویداد ناشناخته!!!!"
        }
    }
    render() {
        return (
            <div className="event">

                <div className="header">
                    <UserAvatar model={this.props.model.creator} view_type={UserViewType.avatar_username}>
                    </UserAvatar>
                </div>
                <div className="body">
                    {this.translate_action.bind(this)()}
                </div>
            </div>

        )
    }
}

export const Event = Component;