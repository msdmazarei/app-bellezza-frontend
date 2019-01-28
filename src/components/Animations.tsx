import * as React from 'react';

import * as ons from 'onsenui';

import {
  Page,
  Toolbar,
  List,
  ListItem,
  ListHeader
} from 'react-onsenui';

const capitalize = (str : string) =>
  str.replace(/^[a-z]/, (c) => c.toUpperCase());

class MyPage extends React.Component {
    interval :any 

  constructor(props: any) {
    super(props);

    this.state = {
      counter: 5
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        counter: (this.state as any).counter - 1
      }, () => {
        if ((this.state as any).counter === 0) {
          clearInterval(this.interval);
          (this.props as any).popPage();
        }
      });
    }, 400);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  render() {
    return (
      <Page>
        <div
          style={{
            textAlign: 'center',
            height: '100%'
          }}>
          <span
            style={{
              display: 'inline-block',
              position: 'relative',
              top: '50%',
              fontSize: '26px',
              transform: 'translate3d(0, -50%, 0)'
            }}>
            Please wait...<br />
            {(this.state as any).counter}
          </span>
         </div>
      </Page>
    );
  }
}

export class Animations extends React.Component<any,any> {
  pushPage(transition: any) {
    const nav = (this.props as any).navigator;

    nav.pushPage({
      comp: MyPage,
      props: {
        key: "my-page",
        popPage: () => nav.popPage({animation: transition, animationOptions: {duration: 0.8}})
      }
    }, {animation: transition, animationOptions: {duration: 0.8}});
  }

  renderToolbar() {
    return (
      <Toolbar>
        <div className='center'>Animations</div>
      </Toolbar>
    );
  }

  render() {
    return (
      <Page renderToolbar={this.renderToolbar}>
        <List
          renderHeader={() => <ListHeader>Transitions</ListHeader>}
          dataSource={['none', 'fade', 'slide', 'lift']}
          renderRow={(row) =>
            <ListItem
              key={`animation-${row}`}
              tappable
              onClick={this.pushPage.bind(this, row)}>
              {capitalize(row)}
            </ListItem>
          }
        />
      </Page>
    );
  }
}
