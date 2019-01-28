import * as React from "react";
export interface HelloProps { compiler: string; framework: string; }
import * as Ons from 'react-onsenui'
import './Home.scss';
// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Hello extends React.Component<HelloProps, {}> {
    render() {
        return (
            <div>
                <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>
                <Ons.Page>
                    <Ons.Button>Tap me!</Ons.Button>
                </Ons.Page>
            </div>
        );
    }
}