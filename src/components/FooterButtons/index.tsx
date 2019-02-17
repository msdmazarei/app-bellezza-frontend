import * as React from 'react'

import './index.scss'

export interface IState { }
export interface IProps { }

export class FooterButtons extends React.Component<IProps, IState> {
    render() {
        return (
            <div className="footer-buttons">

                {this.props.children}
            </div>
        )
    }
}