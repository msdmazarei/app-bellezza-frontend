import * as React from 'react';
import { Page, List, ListHeader, ListItem, Navigator } from 'react-onsenui'
import { Splitter, SplitterSide, SplitterContent } from 'react-onsenui';
import { Toolbar, ToolbarButton, Icon } from 'react-onsenui';
import { SideMenu } from './BSideMenu/SideMenu';

export interface IGeneralPageState {
    page_title: string
    page_name: string
}

export interface IGeneralPageProps {
    navigator: Navigator
    is_app_sidebar_open?: boolean
    open_app_sidebar?: () => void
    close_app_sidebar?: () => void
}

export class GeneralPage<P extends IGeneralPageProps, S extends IGeneralPageState> extends React.Component<P, S> {

    constructor(props: P) {
        super(props);
    }

    show() {

       this.props.open_app_sidebar && this.props.open_app_sidebar()
    }

    hide() {
       this.props.close_app_sidebar && this.props.close_app_sidebar()
    }

    get_internal_page_content(): React.ReactElement<any> {
        debugger;
        return (
            <div></div>
        )
    }

    renderToolbar() {

        return (
            <Toolbar>
                <div className='center'>{this.state.page_title}</div>
                <div className='right'>
                    <ToolbarButton onClick={this.show.bind(this)}>
                        <Icon icon='ion-navicon, material:md-menu' />
                    </ToolbarButton>
                </div>

            </Toolbar>
        );
    }


    render() {
        debugger;
        return (
            <Page>
                <Splitter>
                    <SplitterSide
                        side='right'
                        isOpen={this.props.is_app_sidebar_open}
                        // onClose={this.props.close_app_sidebar}
                        // onOpen={this.props.open_app_sidebar}
                        collapse={true}
                        width={240}
                        swipeable={true}>
                        <SideMenu navigator={this.props.navigator}></SideMenu>
                    </SplitterSide>
                    <SplitterContent>
                        <Page renderToolbar={this.renderToolbar.bind(this)} className={this.state.page_name}>
                            {this.get_internal_page_content()}
                        </Page>
                    </SplitterContent>
                </Splitter>
            </Page>
        );
    }
}

