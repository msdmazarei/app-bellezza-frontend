import * as React from 'react'
import * as ons from 'react-onsenui'
import { IUser } from '../../models/user';
import { user_repo } from '../../repositories/user_repo';
import { UserAvatar, UserViewType } from '../UserAvatar/UserAvatar';
import './leave-comment.scss';

interface IState {
    comment_text?: string
}
export interface IProps {
    user: IUser
}

export class LeaveComment extends React.Component<IProps, IState>{

    constructor(props: IProps){
        super(props)
        this.state={}
        
    }


    text_entered(event: { target: HTMLInputElement; }) {
        this.setState({...this.state, comment_text: event.target.value})
    }

    render() {
        if (this.props.user)
        return (
            
            <div className="leave_comment">
                {this.props.user &&
                    <UserAvatar model={this.props.user} view_type={UserViewType.avatar_username}></UserAvatar>
                }
                <ons.Input placeholder="یادداشت بنویسید" onChange={this.text_entered.bind(this)}></ons.Input>
            </div>
        ) ;
        else 
        return (<div></div>)
    }
}