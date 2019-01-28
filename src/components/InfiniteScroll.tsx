import * as React from 'react';
import * as ons from 'onsenui';

import {
  Page,
  Toolbar,
  BackButton,
  LazyList,
  ListItem
} from 'react-onsenui';

export class InfiniteScroll extends React.Component<any,any> {
  renderRow(index: any) {
    return (
      <ListItem key={index}>
        {'Item ' + (index + 1)}
      </ListItem>
    );
  }

  renderToolbar() {
    return (
      <Toolbar>
        <div className='left'>
          <BackButton>Back</BackButton>
        </div>
        <div className='center'>
          Infinite scroll
        </div>
      </Toolbar>
    );
  }

  render() {
    return (
      <Page renderToolbar={this.renderToolbar}>
        <LazyList
          length={10000}
          renderRow={this.renderRow}
          calculateItemHeight={() => ons.platform.isAndroid() ? 48 : 44}
        />
      </Page>
    );
  }
}
