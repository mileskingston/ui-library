import React from 'react';
import { mount } from 'enzyme';

import ViewSwitch from './ViewSwitch';

const wrapper = mount(
  <ViewSwitch view="list" />
);

describe('ViewSwitch', () => {
  it('renders container', () => {
    expect(wrapper.find('.dc-view-switch').length).toBe(1);
  });
  it('renders two buttons', () => {
    expect(wrapper.find('button').length).toBe(2);
  });
  it('if the view equals list, the list button should have a disabled class', () => {
    expect(wrapper.find('button').last().hasClass('dc-button-disabled')).toBe(true);
  });
});
