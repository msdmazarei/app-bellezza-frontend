import * as React from 'react';
import * as ons from 'react-onsenui'
import { Post as model } from '../../models/Post'
import { UserAvatar, UserViewType } from '../UserAvatar/UserAvatar';
import { Comment } from '../Comment/comment';
import { LeaveComment } from '../Comment/leave_comment';
import './InstaCard.scss'
import { IRouteConfig } from '../../redux/Actions/route';
import { COMPONENT_ROUTE_NAME } from '../../redux/app_state';
import { post_repo } from '../../repositories/post_repo';
import { IUser } from '../../models/user';
import { toast_error, toast_message } from '../../utils';
interface State {
    likes?: number
    is_like_by_me?: boolean
}
export interface Props {
    model: model,
    onClick?: (e: React.MouseEvent, model: model) => void,
    change_app_route: (route_config: IRouteConfig) => void
    user: IUser
}

export class InstaCard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {}
    }

    on_card_click(e: React.MouseEvent) {
        this.props.onClick && this.props.onClick(e, this.props.model)
    }

    on_comments_click(e: React.MouseEvent, model: model) {
        this.props.change_app_route({
            target_component: COMPONENT_ROUTE_NAME.PostComment,
            props: {
                model: this.props.model
            }
        })
    }
    like_text(n: number) {
        if (n < 1000)
            return n
        else if (n < 1000000) return Math.ceil(n / 100) / 10 + "K"
        else Math.ceil(n / 100000) / 10 + "M"
    }
    async like_unlike() {
        debugger;
        if (this.props.user == null) {
            toast_message("برای انجام این کار ابتدا باید وارد شوید", 3000, "yellow")
            return
        }
        let p: Promise<boolean> = null;
        if (this.is_liked_by_me()) {
            p = post_repo.unlike(this.props.user, this.props.model)
        } else {
            p = post_repo.like(this.props.user, this.props.model)
        }
        try {
            let r = await p;
            if (this.is_liked_by_me()) {
                //unlike
                this.setState({ ...this.state, is_like_by_me: false, likes: this.props.model.likes - 1 })

            } else {
                //like
                this.setState({ ...this.state, 
                    is_like_by_me: true, 
                    likes:( (this.props.model.likes || 0) + 1 )
                })
            }
        } catch (e) {
            toast_error(e)
        }
    }
    is_liked_by_me(): boolean {
        debugger;
        return this.state.is_like_by_me || this.props.model.is_liked_by_me || false

    }
    likes(): number {
        return this.state.likes || this.props.model.likes || 0
    }

    render() {
        console.log("likes:",this.likes())
        if (this.props.model == null)
            return <div></div>
        return (
            <div className="InstaCard">
                <div className="header">
                    <UserAvatar model={this.props.model.creator} view_type={UserViewType.avatar_username}></UserAvatar>
                    <ons.Icon icon="fa-ellipsis-v" className="top-menu"></ons.Icon>
                </div>
                <div className="insta-images" onClick={this.on_card_click.bind(this)}>
                    <ons.Carousel
                        swipeable
                        autoScroll
                    >
                        {this.props.model.images.map(x => {

                            return <ons.CarouselItem key={x} className="image-content">
                                <img src={x}></img>
                            </ons.CarouselItem>

                        })}

                    </ons.Carousel>
                </div>
                <div className="title_desc">
                    <div className="actions">
                        <a onClick={this.like_unlike.bind(this)}>
                            <ons.Icon icon="fa-heart" className={this.is_liked_by_me.bind(this)() ? "red-text" : ""} >
                                <i hidden={this.likes.bind(this)() == 0} className="likes_numbers" >{this.like_text(this.likes.bind(this)())}</i>
                            </ons.Icon>
                        </a>
                        <ons.Icon icon="fa-comment"></ons.Icon>
                        <a onClick={this.on_comments_click.bind(this)}>
                            <ons.Icon icon="fa-comments"></ons.Icon>

                        </a>
                    </div>

                    {this.props.model.title && <h5>{this.props.model.title}</h5>}
                    {this.props.model.description && <p> {this.props.model.description}</p>}
                </div>
                <div className="comments">
                    {this.props.model.comments.length > 0 &&
                        <Comment model={this.props.model.comments[this.props.model.comments.length - 1]}></Comment>
                    }
                    
                    <LeaveComment user={this.props.user}></LeaveComment>
                </div>
            </div>)
    }
}
