import * as React from 'react';
import { Navigator } from 'react-onsenui';
import {Tabs} from './Tabs';
import { SpecTagPage } from './SpecTagPage';
export class App extends React.Component <any,any>{

    renderPage(route: any, navigator: any) {
        console.log("route ",route,"key:",route.props.key);
        debugger;
        route.props = route.props || {};
        route.props.navigator = navigator;

        return React.createElement(route.comp, route.props);
    }

    render() {
        return (
            <Navigator
                initialRoute={
                    { comp: Tabs, props: { key: 'tabs' } }
                    // { comp: SpecTagPage, props: { tag:{}, key: 'tabs' } }
                }
                renderPage={this.renderPage}
                
            >
            
            </Navigator>
        );
    }
}
