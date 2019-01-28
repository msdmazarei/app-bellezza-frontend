import * as ons from 'onsenui';
import * as React from 'react';
import './Home.scss';
import { Page, List, ListHeader, ListItem, Navigator } from 'react-onsenui'
import { Splitter, SplitterSide, SplitterContent } from 'react-onsenui';
import { Toolbar, ToolbarButton, Icon } from 'react-onsenui';
import { Card } from 'react-onsenui';
const initialPlatform = ons.platform.isAndroid() ? 'android' : 'ios';

import { PullToRefresh } from './PullToRefresh';
import { InfiniteScroll } from './InfiniteScroll';
import { SideMenu } from './SideMenu';
import { FloatingActionButton } from './FloatingActionButton';
import { SpeedDials } from './SpeedDials';
import { ITag } from '../models/tag';
import { tag_repo } from '../repositories/tag_repo';
import { SpecTagPage } from './SpecTagPage';

export interface IHomeState {
  primary_tags: Array<ITag>
  isOpen: boolean
}

export interface IHomeProps {
  navigator: Navigator
}

export class Home extends React.Component<IHomeProps, IHomeState> {

  constructor(props: IHomeProps) {
    console.log("props:", props)
    super(props);
    this.state = { isOpen: false, primary_tags: [] };


  }

  async componentWillMount() {
    const old_state = this.state;

    let primary_tags = await tag_repo.get_primary_tags();

    let new_state = { ...old_state, primary_tags: primary_tags };
    this.setState(new_state);
  }

  show() {
    this.setState({
      isOpen: true
    });
  }



  gotoComponent(component: any, key: any) {
    this.props.navigator.pushPage({ comp: component, props: { key } });
  }

  hide() {
    this.setState({
      isOpen: false
    });
  }

  renderToolbar() {

    return (
      <Toolbar>
        <div className='center'>خانه</div>
        <div className='right'>
          <ToolbarButton onClick={this.show.bind(this)}>
            <Icon icon='ion-navicon, material:md-menu' />
          </ToolbarButton>
        </div>

      </Toolbar>
    );
  }

  on_card_click(tag: ITag) {
    debugger;
    this.props.navigator.pushPage({
      comp: SpecTagPage,
      props: { tag: tag, key: "jafar" }
    })
  }

  render() {
    return (
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
              <ListItem>
                <Icon className="fa-user-plus"></Icon>
                <span>ثبت نام</span>
              </ListItem>

              <ListItem>
                <Icon className="fa-info-circle"></Icon>
                <span> درباره ما</span>
              </ListItem>

            </List>
            {/* <List
              dataSource={["ورود", "ثبت نام", "سفارش", "درباره ما"]}
              renderHeader={() => <ListHeader>Menu</ListHeader>}
              renderRow={(i) => <ListItem key={`${i}`} modifier='longdivider' tappable>{i}</ListItem>}
            /> */}
          </Page>
        </SplitterSide>
        <SplitterContent>

          <Page renderToolbar={this.renderToolbar.bind(this)} className="Home">
            {
              this.state.primary_tags.map(x =>
                (
                  <div key={x.id} className="primary-tag" onClick={this.on_card_click.bind(this, x)}>
                    <div className="msd-right">
                      <h2>{x.title}</h2>
                      {x.icon && <img src={x.icon}></img>}
                    </div>
                    <div className="msd-left">
                      <p>
                        {x.description && x.description}
                      </p>
                    </div>
                  </div>
                )
              )
            }


          </Page>

        </SplitterContent>
      </Splitter>

    );
  }
}

