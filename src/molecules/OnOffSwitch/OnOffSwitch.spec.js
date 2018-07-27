/* global describe, it */
import React from 'react';
import { mount } from 'enzyme';

import OnOffSwitch from './OnOffSwitch';

const onSwitch = jest.fn();
const wrapper = mount(
  <OnOffSwitch
    onSwitch={onSwitch}
    name="test"
    active
    label="Yes"
    description="Just click it!"
  />
);

describe('OnOffSwitch', () => {
  it('has "displayName" property set', () => {
    expect(OnOffSwitch.displayName).toBe('OnOffSwitch');
  });

  it('checkbox element with proper "name" attribute is present', () => {
    const input = wrapper.find('input[type="checkbox"][name="test"]');
    expect(input.length).toBe(1);
  });

  it('has proper label rendered', () => {
    const onOffSwitch = wrapper.find('.dc-on-off-switch-label');
    expect(onOffSwitch.text()).toEqual('Yes');
  });

  it('is "On"', () => {
    const onOffSwitch = wrapper.find('.dc-on-off-switch-active');
    expect(onOffSwitch.length).toBe(1);
  });

  it('"onSwitch" is called on click', () => {
    const onOffSwitch = wrapper.find('.dc-on-off-switch-wrapper');
    onOffSwitch.simulate('click');
    expect(onSwitch.mock.calls.length).toBe(1);
  });

  it('has proper description rendered', () => {
    const onOffSwitch = wrapper.find('.dc-on-off-switch-description');
    expect(onOffSwitch.text()).toEqual('Just click it!');
  });
});

