import * as React from 'react'
import * as ons from 'react-onsenui'
import { IUser } from '../../models/user';
import { user_repo } from '../../repositories/user_repo';
import { UserAvatar, UserViewType } from '../UserAvatar/UserAvatar';
import './leave-comment.scss';
import { toast_error, toast_message } from '../../utils';
import { post_repo } from '../../repositories/post_repo';
import { Post } from '../../models/Post';
import {comment} from '../../models/comment'
interface IState {
    comment_text?: string
}
export interface IProps {
    user: IUser,
    post: Post,
    onAddComment?: (comment: comment) => void
}

export class LeaveComment extends React.Component<IProps, IState>{

    constructor(props: IProps){
        super(props)
        this.state={}
        
    }


    text_entered(event: { target: HTMLInputElement; }) {
        this.setState({...this.state, comment_text: event.target.value})
    }

   async send_comment(){
        try{
            const res = await post_repo.send_comment(this.props.user,this.props.post, this.state.comment_text)
            toast_message("یادداشت شما با موفقیت ثبت شد",3000,"green")
            this.setState({

                ...this.state, comment_text: ""
            })
            this.props.onAddComment && this.props.onAddComment(res)
        } catch(e){
            toast_error(e)
        }
    }

    render() {
        if (this.props.user)
        return (
            
            <div className="leave_comment">
                {this.props.user &&
                    <UserAvatar model={this.props.user} view_type={UserViewType.avatar_username}></UserAvatar>
                }
                
                <ons.Input placeholder="یادداشت بنویسید" onChange={this.text_entered.bind(this)} value={this.state.comment_text}></ons.Input>
                <a onClick={this.send_comment.bind(this)} hidden={(this.state.comment_text||"").trim()==""}>
                <ons.Icon icon="fa-paper-plane" ></ons.Icon>
                </a>
            </div>
        ) ;
        else 
        return (<div></div>)
    }
}