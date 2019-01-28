import * as React from 'react';
import * as ons from 'react-onsenui'
import { Post as model } from '../../models/Post'
import { UserAvatar, UserViewType } from '../UserAvatar/UserAvatar';
import { Comment } from '../Comment/comment';
import { LeaveComment } from '../Comment/leave_comment';
import './InstaCard.scss'
interface State { }
export interface Props { model: model }

export class InstaCard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
    }

    render() {
        if (this.props.model == null)
            return <div></div>
        return (
            <div className="InstaCard">
                <div className="header">
                    <UserAvatar model={this.props.model.creator} view_type={UserViewType.avatar_username}></UserAvatar>
                    <ons.Icon icon="fa-ellipsis-v" className="top-menu"></ons.Icon>
                </div>
                <div className="insta-images">
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
                        <ons.Icon icon="fa-heart"></ons.Icon>
                        <ons.Icon icon="fa-comment"></ons.Icon>
                        <ons.Icon icon="fa-comments"></ons.Icon>
                    </div>

                    {this.props.model.title && <h5>{this.props.model.title}</h5>}
                    {this.props.model.description && <p> {this.props.model.description}</p>}
                </div>
                <div className="comments">
                    {this.props.model.comments.length > 0 &&
                        <Comment model={this.props.model.comments[this.props.model.comments.length - 1]}></Comment>
                    }
                    <LeaveComment></LeaveComment>
                </div>
            </div>)
    }
}
