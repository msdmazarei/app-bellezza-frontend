import * as React from 'react'
import { connect } from 'react-redux'
import { COMPONENT_ROUTE_NAME, redux_state } from '../redux/app_state';
import { Navigator } from 'react-onsenui'
import { Tabs } from './Tabs';
import { PostNewDesign } from './PostNewDesign/post_new_design';
import { stat } from 'fs';
import { SpecTagPage } from './SpecTagPage';
import { IRouteConfig } from '../redux/Actions/route';

export interface IState {
    navigator: Navigator
}
export interface IProps {
    current_route?: {
        component: COMPONENT_ROUTE_NAME,
        props: any,
        key?: string
    }
}


class Component extends React.Component<IProps, IState> {
    navigator: Navigator;

    constructor(props: IProps) {
        super(props)
        this.state = { navigator: null }
    }

    change_route(route: IRouteConfig) {
        if (this.navigator) {
            const r = {
                comp: this.enum2component( route.target_component),
                props: route.props || {}
            }
            r.props.change_app_route = this.change_route.bind(this)
            this.navigator.pushPage(r)
        }
    }

    renderPage(route: any, navigator: Navigator) {

        route.props = route.props || {};
        route.props.navigator = navigator;

        return React.createElement(route.comp, route.props);
    }

    enum2component(component_enum: COMPONENT_ROUTE_NAME) {
        switch (component_enum) {
            case COMPONENT_ROUTE_NAME.TABS:
                return Tabs;
            case COMPONENT_ROUTE_NAME.POST_NEW_DESIGN:
                return PostNewDesign;
            case COMPONENT_ROUTE_NAME.SPEC_TAG_ITEMS:
                return SpecTagPage;
        }
    }

    render() {
        // if (this.navigator && this.props && this.props.current_route) {

        //     if (this.props.current_route.component) {
        //         this.navigator.pushPage({
        //             comp: this.enum2component(
        //                 this.props.current_route.component),
        //             props: this.props.current_route.props
        //         })

        //     }
        // }
        return (
            <Navigator
                ref={(me) => {

                    this.navigator = me;
                }
                }
                initialRoute={
                    {
                        comp: Tabs,
                        props: {change_app_route: this.change_route.bind(this)}
                    }
                }
                renderPage={this.renderPage}

            >

            </Navigator>
        )
    }
}

const state2props = (state: redux_state) => {
    return {
        current_route: {
            component: state.current_route.component,
            props: state.current_route.props,
            key: state.current_route.key
        }
    }
}

// export const AppRouter = connect(state2props, null)(Component)
export const AppRouter = Component;