import { COMPONENT_ROUTE_NAME } from "../app_state";
import { EACTIONS } from "../ActionsEnum";
import { any } from "prop-types";
import { Action } from 'redux'

export interface IRouteAction extends Action<EACTIONS> {
    component: COMPONENT_ROUTE_NAME,
    props: any,
    key?: string

}

export interface IRouteConfig { target_component: COMPONENT_ROUTE_NAME, props: any, key?: string }
export function action_change_route(route_config: IRouteConfig): IRouteAction {
    debugger;
    return {
        component: route_config.target_component,
        props: route_config.props,
        key: route_config.key,
        type: EACTIONS.CHANGE_APP_ROUTE
    }
}