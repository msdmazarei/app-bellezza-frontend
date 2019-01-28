import * as React from 'react';
import { Page, List, ListHeader, ListItem } from 'react-onsenui'
import { Splitter, SplitterSide, SplitterContent } from 'react-onsenui';
import { Toolbar, ToolbarButton, Icon } from 'react-onsenui';

export interface IGeneralPageState {
    isOpen: boolean
    page_title: string
    page_name: string
}

export class GeneralPage<P, S extends IGeneralPageState> extends React.Component<P, S> {

    constructor(props: P) {
        super(props);
    }

    show() {

        this.setState({
            ...this.state,
            isOpen: true
        });
    }

    hide() {
        debugger;
        this.setState({
            ...this.state,
            isOpen: false
        });
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
                        isOpen={(this.state as any).isOpen}
                        onClose={this.hide.bind(this)}
                        onOpen={this.show.bind(this)}
                        collapse={true}
                        width={240}
                        swipeable={true}>
                        <Page className="msd-main-menu">
                            <List>
                                <ListHeader>منوی اصلی</ListHeader>
                                <ListItem key="login">
                                    <Icon className="fa-sign-in-alt" ></Icon>
                                    <span>ورود</span>
                                </ListItem>
                                <ListItem key="signup">
                                    <Icon className="fa-user-plus"></Icon>
                                    <span>ثبت نام</span>
                                </ListItem>

                                <ListItem key="about-us">
                                    <Icon className="fa-info-circle"></Icon>
                                    <span> درباره ما</span>
                                </ListItem>

                            </List>
                        </Page>
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

