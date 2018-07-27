import React from 'react';
import { mount } from 'enzyme';
import List from './List';

const items = ['item 1', 'item 2', 'item 3'];

const listWrapper = mount(
  <div>
    <div id="list-1">
      <List items={items} />
    </div>
    <div id="list-2">
      <List items={items} icon="Cross" />
    </div>
  </div>
);

describe('List', () => {
  it('renders each item', () => {
    expect(listWrapper.find('#list-1 li').length).toBe(3);
  });
  it('renders a custom icon', () => {
    expect(listWrapper.find('#list-2 .dc-icon-cross').length).toBe(3);
  });
});
