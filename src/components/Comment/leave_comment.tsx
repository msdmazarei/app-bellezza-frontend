import * as React from 'react'
import * as ons from 'react-onsenui'
import { IUser } from '../../models/user';
import { user_repo } from '../../repositories/user_repo';
import { UserAvatar, UserViewType } from '../UserAvatar/UserAvatar';
import './leave-comment.scss';

interface IState {
    logged_in_user?: IUser
    comment_text?: string
}
export interface IProps {

}

export class LeaveComment extends React.Component<IProps, IState>{

    constructor(props: IProps){
        super(props)
        this.state={}
        
    }
    async componentDidMount() {
        const old_state = this.state
        let lu = await user_repo.get_logged_in_user()
        this.setState({
            ...old_state, logged_in_user: lu
        })
    }

    text_entered(event: { target: HTMLInputElement; }) {
        this.setState({...this.state, comment_text: event.target.value})
    }

    render() {
        return (
            <div className="leave_comment">
                {this.state.logged_in_user &&
                    <UserAvatar model={this.state.logged_in_user} view_type={UserViewType.avatar_username}></UserAvatar>
                }
                <ons.Input placeholder="یادداشت بنویسید" onChange={this.text_entered.bind(this)}></ons.Input>
            </div>
        )
    }
}