import * as ons from 'onsenui';
import * as React from 'react';
import './Home.scss';
import { Page, List, ListHeader, ListItem, Navigator } from 'react-onsenui'
import { Splitter, SplitterSide, SplitterContent } from 'react-onsenui';
import { Toolbar, ToolbarButton, Icon } from 'react-onsenui';
import { Card } from 'react-onsenui';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux'
const initialPlatform = ons.platform.isAndroid() ? 'android' : 'ios';

import { PullToRefresh } from './PullToRefresh';
import { InfiniteScroll } from './InfiniteScroll';
import { SideMenu } from './BSideMenu/SideMenu';
import { FloatingActionButton } from './FloatingActionButton';
import { SpeedDials } from './SpeedDials';
import { ITag } from '../models/tag';
import { tag_repo } from '../repositories/tag_repo';
import { SpecTagPage } from './SpecTagPage';
import { redux_state, COMPONENT_ROUTE_NAME } from '../redux/app_state';
import { action_open_app_sidebar, action_close_app_sidebar } from '../redux/Actions/app_sidebar';
import { Dispatch } from 'redux';
import { IGeneralPageState, IGeneralPageProps, GeneralPage } from './GeneralPage';
import { action_change_route, IRouteConfig } from '../redux/Actions/route';

export interface IHomeState extends IGeneralPageState {
  primary_tags: Array<ITag>
}

export interface IHomeProps extends IGeneralPageProps {

}

export class Component extends GeneralPage<IHomeProps, IHomeState> {

  constructor(props: IHomeProps) {
    console.log("props:", props)
    super(props);
    this.state = {
      page_title: "صفحه اصلی",
      page_name: "home",
      primary_tags: []
    };


  }

  async componentWillMount() {
    const old_state = this.state;

    let primary_tags = await tag_repo.get_primary_tags();

    let new_state = { ...old_state, primary_tags: primary_tags };
    this.setState(new_state);
  }



  gotoComponent(component: any, key: any) {
    this.props.navigator.pushPage({ comp: component, props: { key } });
  }



  // renderToolbar() {

  //   return (
  //     <Toolbar>
  //       <div className='center'>خانه</div>
  //       <div className='right'>
  //         <ToolbarButton onClick={this.props.open_app_sidebar}>
  //           <Icon icon='ion-navicon, material:md-menu' />
  //         </ToolbarButton>
  //       </div>

  //     </Toolbar>
  //   );
  // }

  on_card_click(tag: ITag) {
    debugger;

    this.props.change_app_route && this.props.change_app_route({
      target_component: COMPONENT_ROUTE_NAME.SPEC_TAG_ITEMS,
      props: { tag: tag }
    })
    // this.props.navigator.pushPage({
    //   comp: SpecTagPage,
    //   props: { tag: tag, key: "jafar" }
    // })
  }
  get_internal_page_content(): React.ReactElement<any> {
    debugger;
    return (
      <div className="Home">
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
        >
      </div>
    )
  }

  // render() {
  //   return (
  //     <Splitter>
  //       <SplitterSide
  //         side='right'
  //         isOpen={this.props.is_app_sidebar_open}
  //         // onClose={this.props.close_app_sidebar}
  //         // onOpen={this.props.open_app_sidebar}
  //         collapse={true}
  //         width={240}
  //         swipeable={true}>
  //         <SideMenu navigator={this.props.navigator}></SideMenu>
  //       </SplitterSide>
  //       <SplitterContent>

  //         <Page renderToolbar={this.renderToolbar.bind(this)} className="Home">



  //         </Page>

  //       </SplitterContent>
  //     </Splitter>

  //   );
  // }
}




const dispatch2props: MapDispatchToProps<{}, {}> = (dispatch: Dispatch) => {
  return {
    open_app_sidebar: () => dispatch(action_open_app_sidebar()),
    close_app_sidebar: () => dispatch(action_close_app_sidebar()),

  }
}

const state2props: MapStateToProps<{ is_app_sidebar_open?: boolean }, { is_app_sidebar_open?: boolean }, redux_state> = (state: redux_state) => {
  return {
    is_app_sidebar_open: state.is_app_sidebar_open
  }
}



export const Home = connect(state2props, dispatch2props)(Component);