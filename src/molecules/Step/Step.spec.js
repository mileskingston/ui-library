/* global describe, it, afterEach, beforeEach */
import React from 'react';
import { mount } from 'enzyme';

import Step from './Step';

const wrapper = mount(
  <Step step={1}>
    <div className="test-child">test child</div>
  </Step>
);

describe('Step, ', () => {
  it('renders the container', () => {
    expect(wrapper.find('.dc-step').length).toBeGreaterThanOrEqual(1);
  });
  it('renders the children', () => {
    expect(wrapper.find('.test-child').length).toBeGreaterThanOrEqual(1);
  });
  it('renders the right step number', () => {
    expect(wrapper.find('.dc-step-number').html()).toMatch('1');
  });
});

