import { COMPONENT_ROUTE_NAME } from "../app_state";
import { IRouteAction } from "../Actions/route";
import { EACTIONS } from "../ActionsEnum";

export function reducer(current_route: {component: COMPONENT_ROUTE_NAME, props: any, key?: string}, action: IRouteAction): {component: COMPONENT_ROUTE_NAME, props: any, key?: string} {
   debugger;
    if (action.type==EACTIONS.CHANGE_APP_ROUTE){
        return {
            component: action.component,
            props: action.props,
            key: action.key
        }
    } 
    if (current_route===undefined)
    return {
        component: COMPONENT_ROUTE_NAME.TABS, 
        props: {},
        key: COMPONENT_ROUTE_NAME.TABS
    }
    else
    return current_route
}