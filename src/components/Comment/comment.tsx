import * as React from 'react';
import { comment } from '../../models/comment';
import { UserAvatar, UserViewType } from '../UserAvatar/UserAvatar';
import './comment.scss';
interface IState {
}
export interface IProps {
    model: comment
}

export class Comment extends React.Component<IProps, IState>{
    constructor(props: IProps) {
        super(props)

    }


    render() {
        return (
            <div className="Comment">
                <UserAvatar model={this.props.model.creator} view_type={UserViewType.avatar_username}></UserAvatar>
                <p>
                    {this.props.model.text}
                </p>
            </div>
        )
    }
}