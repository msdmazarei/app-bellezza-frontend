import * as React from 'react';
import { Page, List, ListHeader, ListItem, Navigator } from 'react-onsenui'
import { Splitter, SplitterSide, SplitterContent } from 'react-onsenui';
import { Toolbar, ToolbarButton, Icon } from 'react-onsenui';
import { SideMenu } from './BSideMenu/SideMenu';
import { COMPONENT_ROUTE_NAME } from '../redux/app_state';
import { IRouteConfig } from '../redux/Actions/route';

export interface IGeneralPageState {
    page_title: string
    page_name: string
}

export interface IGeneralPageProps {
    navigator: Navigator
    is_app_sidebar_open?: boolean
    open_app_sidebar?: () => void
    close_app_sidebar?: () => void
    change_app_route?: (route_config: IRouteConfig) => void
}

export class GeneralPage<P extends IGeneralPageProps, S extends IGeneralPageState> extends React.Component<P, S> {

    constructor(props: P) {
        super(props);
    }

    componentDidUpdate(prevProps: any, prevState: any) {
        if ('child_component_did_update' in this)
            (this as any)['child_component_did_update'](prevProps, prevState)
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
    back() {

        this.props.navigator.popPage()
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
                <div className="left" >
                    {this.props.navigator.routes.length > 1 &&

                        <ToolbarButton onClick={this.back.bind(this)}>
                            <Icon icon='fa-arrow-left' />
                        </ToolbarButton>}

                </div>

            </Toolbar>
        );
    }
    on_infinit_scroll() {
        if ('onInfiniteScroll' in this) {
            (this as any).onInfiniteScroll.apply(arguments)
        }
    }

    render() {
        debugger;
        return (
            <Page

            >
                <Splitter>
                    <SplitterSide
                        side='right'
                        isOpen={this.props.is_app_sidebar_open}
                        onClose={this.props.close_app_sidebar}
                        // onOpen={this.props.open_app_sidebar}
                        collapse={true}
                        width={240}
                        swipeable={true}>
                        <SideMenu navigator={this.props.navigator} change_app_route={this.props.change_app_route}></SideMenu>
                    </SplitterSide>
                    <SplitterContent>
                        <Page
                            renderToolbar={this.renderToolbar.bind(this)}
                            className={this.state.page_name}

                        >
                            {this.get_internal_page_content()}
                        </Page>
                    </SplitterContent>
                </Splitter>

            </Page>
        );
    }
}

