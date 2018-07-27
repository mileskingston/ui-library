/* global describe, it */
import React from 'react';
import { mount } from 'enzyme';

import Print from './Print';

window.print = jest.fn();

const wrapper = mount(
  <Print
    label="Print"
  />
);

describe('Print component', () => {
  it('wrapper is rendered', () => {
    expect(wrapper.find('.dc-print').length).toBe(1);
  });

  it('label is rendered properly', () => {
    expect(wrapper.find('.dc-print-label').text()).toBe('Print');
  });

  it('icon is rendered properly', () => {
    expect(wrapper.find('.dc-icon').length).toBe(1);
  });

  it('window.print function is called on click', () => {
    wrapper.find('.dc-print').at(0).simulate('click');
    expect(window.print).toHaveBeenCalled();
  });

});
