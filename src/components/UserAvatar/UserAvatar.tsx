import * as React from 'react';
import * as ons from 'react-onsenui';
import './UserAvatar.scss';
import { IUser } from '../../models/user';

interface IState { }
export enum UserViewType {
    avatar_username = "image_username",
    avatar = "avatar"
}

interface IProps {
    model: IUser
    view_type: UserViewType
}

export class UserAvatar extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
    }

    render() {
        let avatar = null;
        if (this.props.model.avatar)
            avatar = <img src={this.props.model.avatar}></img>
        else
            avatar = <ons.Icon icon="fa-user"></ons.Icon>

        return (
            <div className="UserAvatar">

                {avatar}
                <span>{this.props.model.name || this.props.model.username}</span>
            </div>
        )
    }
}

