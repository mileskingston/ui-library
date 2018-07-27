import React from 'react';
import { mount } from 'enzyme';

import ToggleButton from './ToggleButton';

const onToggle = jest.fn();
const cardWrapper = mount(
  <ToggleButton
    active
    onToggle={onToggle}
    activeBtnContent="Active Content"
    inActiveBtnContent="In-Active Content"
  />
);

describe('ToggleButton', () => {
  it('renders active button', () => {
    expect(cardWrapper.find('.dc-toggle-button__active').length).toBe(1);
  });
  it('renders active button content', () => {
    expect(cardWrapper.find('.dc-toggle-button__active').text()).toContain('Active Content');
  });
  it('does not render in-active button', () => {
    expect(cardWrapper.find('.dc-toggle-button').length).toBe(0);
  });
  it('onToggle is called on click', () => {
    cardWrapper.find('.dc-toggle-button__active').simulate('click');
    expect(onToggle.mock.calls.length).toBe(1);
  });
});
