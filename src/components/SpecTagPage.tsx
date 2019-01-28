import * as ons from 'onsenui';
import * as React from 'react';

import { Page, List, ListHeader, ListItem, Navigator } from 'react-onsenui'
import { ITag } from '../models/tag';
import { GeneralPage, IGeneralPageState } from './GeneralPage';
import { Post } from '../models/Post';
import { post_repo } from '../repositories/post_repo';
import { InstaCard } from './InstaCard/InstaCard';
import { ninvoke } from 'q';
export interface ISpecTagPageState extends IGeneralPageState {
    loaded_posts: Array<Post>
}

export interface ISpecTagPageProps {
    navigator: Navigator
    tag: ITag
}

export class SpecTagPage extends GeneralPage<ISpecTagPageProps, ISpecTagPageState> {
    constructor(props: ISpecTagPageProps) {
        super(props)
        this.state = {
            isOpen: false,
            page_title: "صفحه تگ",
            page_name: "tag_page",
            loaded_posts: []
        }
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
                    {this.state.loaded_posts.map(x =>
                        <InstaCard model={x} key={x.id}></InstaCard>)}
                </div>
            )
        else
            return null;
    }

    render() {
        return super.render();
    }
}