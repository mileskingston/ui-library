/* global describe, it */
import React from 'react';
import { mount } from 'enzyme';

import Loader from './Loader';

describe('Loader', () => {
  const wrapper = mount(<Loader align="left" size="large" />);

  it('renders container correctly', () => {
    expect(wrapper.find('.dc-loader').length).toBe(1);
  });

  it('renders the spinner Icon', () => {
    expect(wrapper.find('Icon').length).toBe(1);
  });

  it('renders correct position class', () => {
    expect(wrapper.find('.dc-loader--left').length).toBe(1);
  });

  it('renders correct size class', () => {
    expect(wrapper.find('.dc-loader--large').length).toBe(1);
  });
});
