import * as React from 'react';

import {
  Page,
  Toolbar,
  BackButton,
  Popover
} from 'react-onsenui';

export class Popovers extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  showPopover() {
    this.setState({
      isOpen: true
    });

    setTimeout(() => {
      this.setState({
        isOpen: false
      });
    }, 1000);
  }

  getTarget() {
    return this.refs.target;
  }

  renderToolbar() {
    return (
      <Toolbar>
        <div className='left'>
          <BackButton>Back</BackButton>
        </div>
        <div className='center'>
          Popovers
        </div>
      </Toolbar>
    );
  }

  render() {
    return (
      <Page renderToolbar={this.renderToolbar}>
        <div style={{textAlign: 'center'}}>
          <br />
          <div
            onClick={this.showPopover.bind(this)}
            style={{
            width: '100px',
            height: '100px',
            display: 'inline-block',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            color: 'rgba(0, 0, 0, 0.6)',
            lineHeight: '100px'
          }} ref="target">
            Click me!
          </div>
        </div>
        <Popover
          isOpen={((this.state as any).isOpen as boolean)}
          getTarget={this.getTarget.bind(this)}>
          <div style={{
            textAlign: 'center',
            lineHeight: '100px'
          }}>
            I'm a popover!
          </div>
        </Popover>
      </Page>
    );
  }
}
