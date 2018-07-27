/* global describe, it */
import React from 'react';
import { mount } from 'enzyme';
import Ribbon from './Ribbon';

const wrapper = mount(
  <Ribbon label="Your billing address" />
);

describe('Ribbon', () => {

  it('renders component', () => {
    expect(wrapper.find('.dc-ribbon').length).toBe(1);
  });

});
