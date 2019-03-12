import * as React from 'react'
import { IGeneralPageProps, IGeneralPageState, GeneralPage } from '../GeneralPage';
import { Post as model } from '../../models/Post'
import { comment } from '../../models/comment';
import { Comment } from '../Comment/comment'
import { post_repo } from '../../repositories/post_repo';
// import * as InfiniteScroll from 'react-infinite-scroller'
import * as InfiniteScroll from 'react-infinite-scroll-component';
import { toast_message, toast_error } from '../../utils';
import { IUser } from '../../models/user';
import { LeaveComment } from '../Comment/leave_comment';

import './index.scss'

enum LOAD_MODE {
    backward,
    forward
}

export interface IState extends IGeneralPageState {
    loaded_comments: Array<comment>,
    mode: LOAD_MODE,
    min_unixepoch: number,
    max_unixepoch: number,
    has_more: boolean,
    loaded_page_no: number

}
export interface IProps extends IGeneralPageProps {
    model: model,
    user: IUser
}

class Component extends GeneralPage<IProps, IState> {
    scrollParentRef: any = null;

    constructor(props: IProps) {
        super(props)
        this.state = {
            loaded_comments: post_repo.fake_comments(1, 1),
            mode: LOAD_MODE.backward,
            min_unixepoch: Number.MIN_SAFE_INTEGER,
            max_unixepoch: Number.MAX_SAFE_INTEGER,
            page_name: "comments",
            page_title: "پانوشت ها",
            has_more: true,
            loaded_page_no: 0
        }
    }
    async componentDidMount() {
        // return ;
        // debugger;
        let comments = await post_repo.get_post_comments(this.props.user, false, Date.now(), 10, this.props.model)
        // if (this.state.mode == LOAD_MODE.backward) {
        //     comments = await post_repo.get_before_comments_for_post(this.state.max_unixepoch, 100, this.props.model)

        // } else {
        //     comments = await post_repo.get_after_comments_for_post(this.state.min_unixepoch, 100, this.props.model)

        // }
        this.setState({ ...this.state, loaded_comments: comments })
    }
    // renderRow() {
    //     debugger;
    //     if (this.state.loaded_comments.length>0)
    //     return ( <Comment model={this.state.loaded_comments[0]}></Comment>
    //     )
    //     else
    //     return null;
    // }
    onlyUnique(value: any, index: number, self: any) {
        return self.indexOf(value) === index;
    }
    async loadFunc() {
        const last_creation_date = Math.min.apply(null, this.state.loaded_comments.map(x => x.create_unixepoch)
        )
        try {
            const res = await post_repo.get_post_comments(this.props.user, false, last_creation_date || Date.now(), 5, this.props.model)
            const new_loaded_post = [... this.state.loaded_comments, ...res]
            const u_new_loaded_post = new_loaded_post.filter(this.onlyUnique);
            this.setState({
                ...this.state, loaded_comments: u_new_loaded_post
            })
        } catch (e) {
            toast_error(e)
        }







        // debugger;
        // console.log("load more function called.")
        // // if (page_no == this.state.loaded_page_no) {
        // //     return;
        // // }

        // const items = post_repo.fake_comments(page_no * 10000, 10)
        // let old_arr = Array.from(this.state.loaded_comments)

        // items.forEach(x => {
        //     old_arr.push(x)
        // })
        // // const new_items = this.state.loaded_comments.push.apply(items)
        // this.setState({
        //     loaded_comments: old_arr,
        //     loaded_page_no: page_no
        // })

    }

    get_internal_page_content(): React.ReactElement<any> {
        debugger;
        return (
            // <div style={{height:"300px" , "overflow": "auto" }}
            // ref={(ref) => this.scrollParentRef = ref}
            // >
            <div className="comments_page">
                <InfiniteScroll
                    dataLength={this.state.loaded_comments.length + 10} //This is important field to render the next data
                    next={this.loadFunc.bind(this)}
                    hasMore={true}
                    scrollThreshold={0.5}
                    height={window.innerHeight - 44-100}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    {this.state.loaded_comments.map(x => {
                        return (
                            <Comment model={x}></Comment>
                        )
                    })}
                </InfiniteScroll>
                <LeaveComment user={this.props.user} post={this.props.model} onAddComment={this.componentDidMount.bind(this)}></LeaveComment>
            </div>

            // <InfiniteScroll
            //     height={300}
            //     dataLength={this.state.loaded_comments.length} //This is important field to render the next data
            //     next={this.loadFunc.bind(this)}
            //     hasMore={true}
            //     loader={<h4>Loading...</h4>}
            //     endMessage={
            //         <p style={{ textAlign: 'center' }}>
            //             <b>Yay! You have seen it all</b>
            //         </p>
            //     }
            // >
            //     {this.state.loaded_comments.map(x => {
            //         return (
            //             <Comment model={x}></Comment>
            //         )
            //     })}
            // </InfiniteScroll>
            // <InfiniteScroll
            //     style={{ height: "300px", "overflow": "auto" }}
            //     pageStart={0}

            //     loadMore={this.loadFunc.bind(this)}
            //     hasMore={true}
            //     loader={<div className="loader" key={0}>Loading ...</div>}
            // // getScrollParent={() => this.scrollParentRef}
            // >

            //     {this.state.loaded_comments.map(x => {
            //         return (
            //             <Comment model={x}></Comment>
            //         )
            //     })}

            // </InfiniteScroll>
            // </div>

        )
    }
}

export const CommentsPage = Component;


