import * as React from 'react';


import {
  Page,
  PullHook,
  Toolbar,
  Icon,
  BackButton,
  List,
  ListItem,
  ListHeader
} from 'react-onsenui';

export class PullToRefresh extends React.Component<{},{}> {
    timeout:any = null;
  constructor(props:any) {
    super(props);

    this.state = {
      pullHookState: 'initial',
      data: this.getRandomData(),
    }
  }

  getRandomName() {
    const names = ['Oscar', 'Max', 'Tiger', 'Sam', 'Misty', 'Simba', 'Coco', 'Chloe', 'Lucy', 'Missy'];
    return names[Math.floor(Math.random() * names.length)];
  }

  getRandomUrl() {
    var width = 40 + Math.floor(20 * Math.random());
    var height= 40 + Math.floor(20 * Math.random());

    return `https://placekitten.com/g/${width}/${height}`;
  }

  getRandomKitten() {
    var name = this.getRandomName();

    return {
      name: this.getRandomName(),
      url: this.getRandomUrl()
    };
  }

  getRandomData() {
    const data = [];

    for (let i = 0; i < 20; i++) {
      data.push(this.getRandomKitten());
    }

    return data;
  }

  handleChange(event:any) {
    this.setState({
      pullHookState: event.state
    });
  }

  handleLoad(done:any) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      this.setState({
        data: this.getRandomData()
      }, done);
    }, 1000);
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  renderToolbar() {
    return (
      <Toolbar>
        <div className="left"><BackButton>Back</BackButton></div>
        <div className="center">Pull to refresh</div>
      </Toolbar>
    );
  }

  renderRow(data:any, index:any) {
    return (
      <ListItem key={`row-${index}`}>
        <div className='left'>
          <img className='list__item__thumbnail' src={data.url} />
        </div>
        <div className='center'>
          {data.name}
        </div>
      </ListItem>
    );
  }

  render() {
    let content;
    const state = (this.state as any).pullHookState;

    if (state === 'initial') {
      content = 'Pull';
    }
    else if (state === 'preaction') {
      content = 'Release';
    }
    else {
      content = <Icon icon='spinner' spin />;
    }

    return (
      <Page renderToolbar={this.renderToolbar}>
        <PullHook onChange={this.handleChange.bind(this)} onLoad={this.handleLoad.bind(this)}>
          {content}
        </PullHook>

        <List
          dataSource={(this.state as any ).data}
          renderHeader={() => <ListHeader>Pull down to refresh</ListHeader>}
          renderRow={this.renderRow}
        />
      </Page>
    );
  }
}
