import * as React from 'react'
import { IGeneralPageProps, IGeneralPageState, GeneralPage } from '../GeneralPage';
import { event } from '../../models/event';
import { Event } from '../Event/index'
import { event_repo as repo } from '../../repositories/event_repo';
import * as InfiniteScroll from 'react-infinite-scroll-component';
import {  toast_error } from '../../utils';
import { IUser } from '../../models/user';

import './index.scss'
import { MapDispatchToProps, connect } from 'react-redux';
import { Dispatch } from 'redux';
// import { action_login_dialog_closed, action_show_login_dialog } from '../../redux/Actions/login';
// import { action_close_app_sidebar } from '../../redux/Actions/app_sidebar';
// import { action_user_logged_out } from '../../redux/Actions/user';
// import { action_show_signup_dialog } from '../../redux/Actions/signup';
import { redux_state } from '../../redux/app_state';



export interface IState extends IGeneralPageState {
    loaded_events: Array<event>,
    min_unixepoch: number,
    max_unixepoch: number,
    has_more: boolean,
}
export interface IProps extends IGeneralPageProps {
    user?: IUser
}

class Component extends GeneralPage<IProps, IState> {
    scrollParentRef: any = null;
    item_load_count: number = 10;

    constructor(props: IProps) {
        super(props)
        this.state = {
            loaded_events: [],
            min_unixepoch: Number.MIN_SAFE_INTEGER,
            max_unixepoch: Number.MAX_SAFE_INTEGER,
            page_name: "events",
            page_title: "رخدادها",
            has_more: true,
        }
    }
    async componentDidMount() {

        let events = await repo.get_events(this.props.user, Date.now(),this.item_load_count)
        let new_state = {...this.state}
        if (events.length<this.item_load_count) {
            new_state.has_more = false
        }  else {
            new_state.has_more = true
        }
        new_state.loaded_events = events

        this.setState(new_state)
    }

    onlyUnique(value: any, index: number, self: any) {
        return self.indexOf(value) === index;
    }
    async loadFunc() {
        const last_creation_date = Math.min.apply(null, this.state.loaded_events.map(x => x.create_unixepoch)
        )
        try {
            const res = await repo.get_events(this.props.user, last_creation_date || Date.now(), this.item_load_count)
            const new_loaded_post = [... this.state.loaded_events, ...res]
            const u_new_loaded_post = new_loaded_post.filter(this.onlyUnique);
           let new_state = {...this.state}
           if(res.length<this.item_load_count){
               new_state.has_more=false
           } else {
               new_state.has_more= true
           }
           new_state.loaded_events = u_new_loaded_post
            this.setState(new_state)
        } catch (e) {
            toast_error(e)
        }









    }

    get_internal_page_content(): React.ReactElement<any> {
        debugger;
        return (
            
            // <div style={{height:"300px" , "overflow": "auto" }}
            // ref={(ref) => this.scrollParentRef = ref}
            // >
            <div className="events_page">
                <InfiniteScroll
                    dataLength={this.state.loaded_events.length} //This is important field to render the next data
                    next={this.loadFunc.bind(this)}
                    hasMore={this.state.has_more}
                    scrollThreshold={0.5}
                    height={window.innerHeight - 44}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b> تمامی رویداد ها را دیدید.</b>
                        </p>
                    }
                >
                    {this.state.loaded_events.map(x => {
                        return (
                            <Event model={x}></Event>
                        )
                    })}
                </InfiniteScroll>
            </div>

        )
    }
}

const dispatch2props: MapDispatchToProps<{}, {}> = (dispatch: Dispatch) => {
    return {
        // dialog_closed: () => dispatch(action_login_dialog_closed()),
        // show_signin_dialog: () => dispatch(action_show_login_dialog()),
        // close_app_sidebar: () => dispatch(action_close_app_sidebar()),
        // do_logout: () => dispatch(action_user_logged_out()),
        // open_signup_dialog: () => dispatch(action_show_signup_dialog())
    }
}

const state2props = (state: redux_state) => {
    return {
        user: state.logged_in_user
    }
}




export const eventsPage = connect(state2props, dispatch2props)(Component);


