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
export interface ISpecTagPageState extends IGeneralPageState {
    loaded_posts: Array<Post>
    is_action_button_open: boolean
}

export interface ISpecTagPageProps extends IGeneralPageProps{
    navigator: Navigator
    tag: ITag
}

export  class SpecTagPage extends GeneralPage<ISpecTagPageProps, ISpecTagPageState> {
    constructor(props: ISpecTagPageProps) {
        super(props)
        this.state = {
            page_title: "صفحه تگ",
            page_name: "tag_page",
            loaded_posts: [],
            is_action_button_open: false
        }

    }


    flip_action_buttons_state(){
        this.setState({...this.state, is_action_button_open: !this.state.is_action_button_open})
    }
    on_action_button_cancel(){
        this.setState({...this.state, is_action_button_open: false})
    }
    

    async componentDidMount() {
        let posts = await post_repo.get_n_posts_for_spec_tag(0, 10, this.props.tag)
        const old_state = this.state

        const new_state = { ...old_state, loaded_posts: posts }

        this.setState(new_state)
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
                    {this.state.loaded_posts.map(x =>
                        <InstaCard 
                        model={x} 
                        key={x.id}
                         onClick={this.flip_action_buttons_state.bind(this)}
                         change_app_route={this.props.change_app_route}
                         
                         ></InstaCard>)}
                </div>
            )
        else
            return null;
    }

    render() {
        return super.render();
    }
}