import * as ons from 'onsenui';
import * as React from 'react';

import { Page, List, ListHeader, ListItem, Navigator, ActionSheet, ActionSheetButton } from 'react-onsenui'
import { ITag } from '../../models/tag';
import { GeneralPage, IGeneralPageState, IGeneralPageProps } from '../GeneralPage';
import { Post } from '../../models/Post';
import { post_repo } from '../../repositories/post_repo';
import { InstaCard } from '../InstaCard/InstaCard';
import { ninvoke } from 'q';
import './index.scss'
import { MapStateToProps, connect, MapDispatchToProps } from 'react-redux';
import { action_open_app_sidebar, action_close_app_sidebar } from '../../redux/Actions/app_sidebar';
import { Dispatch } from 'redux';
import { redux_state } from '../../redux/app_state';
import * as InfiniteScroll from 'react-infinite-scroll-component';
import { toast_error } from '../../utils';
import { IUser } from '../../models/user';
export interface ISpecTagPageState extends IGeneralPageState {
    loaded_posts: Array<Post>
    is_action_button_open: boolean
}

export interface ISpecTagPageProps extends IGeneralPageProps {
    navigator: Navigator
    tag: ITag,
    user: IUser
}

export class Component extends GeneralPage<ISpecTagPageProps, ISpecTagPageState> {
    constructor(props: ISpecTagPageProps) {
        super(props)
        this.state = {
            page_title: "صفحه تگ",
            page_name: "tag_page",
            loaded_posts: [],
            is_action_button_open: false
        }

    }


    flip_action_buttons_state() {
        this.setState({ ...this.state, is_action_button_open: !this.state.is_action_button_open })
    }
    on_action_button_cancel() {
        this.setState({ ...this.state, is_action_button_open: false })
    }


    async componentDidMount() {
        debugger;
        let posts = await post_repo.get_post(false, Date.now(), 5, this.props.tag)
        const old_state = this.state

        const new_state: ISpecTagPageState = {
            ...old_state, loaded_posts: posts,
            page_title: `${this.props.tag.title}`

        }

        this.setState(new_state)
    }
    onlyUnique(value: any, index: number, self: any) {
        return self.indexOf(value) === index;
    }

    async loadFunc() {
        const last_creation_date = Math.min.apply(null, this.state.loaded_posts.map(x => x.create_unixepoch)
        )
        try {
            const res = await post_repo.get_post(false, last_creation_date || Date.now(), 5, this.props.tag)
            const new_loaded_post = [... this.state.loaded_posts, ...res]
            const u_new_loaded_post = new_loaded_post.filter(this.onlyUnique);
            this.setState({
                ...this.state, loaded_posts: u_new_loaded_post
            })
        } catch (e) {
            toast_error(e)
        }

    }


    get_internal_page_content(): React.ReactElement<any> {
        if (this.state.loaded_posts && this.state.loaded_posts.length > 0)
            return (
                <div>
                    <ActionSheet isOpen={this.state.is_action_button_open}
                        onCancel={this.on_action_button_cancel.bind(this)}
                        className="action-sheet-rtl"
                    >
                        <ActionSheetButton>من خیاطم و این رو می دوزم</ActionSheetButton>
                        <ActionSheetButton>من مدلم و دوست دارم بپوشمش</ActionSheetButton>
                        <ActionSheetButton>من دوستش دارم و خریدارم</ActionSheetButton>
                        <ActionSheetButton>قشنگه!!</ActionSheetButton>
                    </ActionSheet>

                    <InfiniteScroll
                        dataLength={this.state.loaded_posts.length + 10} //This is important field to render the next data
                        next={this.loadFunc.bind(this)}
                        hasMore={true}
                        scrollThreshold={0.5}
                        height={window.innerHeight - 44}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                    >
                        {this.state.loaded_posts.map(x =>
                            <InstaCard
                                user={this.props.user}
                                model={x}
                                key={x.id}
                                onClick={this.flip_action_buttons_state.bind(this)}
                                change_app_route={this.props.change_app_route}

                            ></InstaCard>)}
                    </InfiniteScroll>


                </div>
            )
        else
            return (<div>موردی برای این شاخه یافت نشد</div>);
    }

}




const dispatch2props: MapDispatchToProps<{}, {}> = (dispatch: Dispatch) => {
    return {
        open_app_sidebar: () => dispatch(action_open_app_sidebar()),
        close_app_sidebar: () => dispatch(action_close_app_sidebar()),

    }
}

const state2props: MapStateToProps<{ is_app_sidebar_open?: boolean }, { is_app_sidebar_open?: boolean }, redux_state> = (state: redux_state) => {
    return {
        is_app_sidebar_open: state.is_app_sidebar_open,
        user: state.logged_in_user
    }
}



export const SpecTagPage = connect(state2props, dispatch2props)(Component);
