import * as React from 'react';
import { comment } from '../../models/comment';
import { UserAvatar, UserViewType } from '../UserAvatar/UserAvatar';
import './comment.scss';
import { IUser } from '../../models/user';
import { timeDifference } from '../../utils';
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
        if (this.props.model.creator == null)
            debugger;
        return (

            <div className="Comment">
                <div className="header">
                    <div className="time">{timeDifference(Date.now(), this.props.model.create_unixepoch*1000)}</div>
                    <UserAvatar
                        model={this.props.model.creator || {} as IUser}
                        view_type={UserViewType.avatar_username}>
                    </UserAvatar>
                </div>

                <p>
                    {this.props.model.text}
                </p>
            </div>
        )
    }
}