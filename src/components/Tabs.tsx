import * as React from "react";
export interface HelloProps { compiler: string; framework: string; }
import {Page, Tabbar, Tab} from 'react-onsenui'

import {  Home} from './Home'
import {Dialogs} from './Dialogs';
import {Forms} from './Forms'
import {Animations} from './Animations';
import { IRouteConfig } from "../redux/Actions/route";

export interface IProps {
  navigator: Navigator
  change_app_route: (route: IRouteConfig)=> void
}

export class Tabs extends React.Component <IProps,any>{
    renderTabs() {
      return [
        {
          content: <Home key="home" navigator={(this.props as any).navigator} change_app_route={this.props.change_app_route} />,
          tab: <Tab key="home" label="طرح ها" icon="ion-ios-home-outline" />
        },
        {
          content: <Dialogs key="dialogs" navigator={(this.props as any).navigator} />,
          tab: <Tab key="dialogs" label="طراحان" icon="ion-ios-albums-outline" />
        },
        {
          content: <Forms key="forms" />,
          tab: <Tab key="forms" label="طرح های من" icon="ion-edit" />
        },
        {
          content: <Animations key="animations" navigator={(this.props as any).navigator} />,
          tab: <Tab key="animations" label="بیشتر" icon="ion-film-marker" />
        }
      ];
    }
    render() {
        return (
          <Page>
            <Tabbar index={1}
              renderTabs={this.renderTabs.bind(this)}
              
            />
          </Page>
        );
      }
    }
      