/* global describe, it, before */
import React from 'react';
import { mount } from 'enzyme';
import Alert from './Alert';

const wrapper = mount(
  <Alert
    header="Notification"
    arrowPosition="right"
    dropShadow
  >
    Hello World!
  </Alert>
);

describe('Alert', () => {
  it('renders component', () => {
    expect(wrapper.find('.dc-alert').length).toBe(1);
  });

  it('renders header with correct label', () => {
    expect(wrapper.find('.dc-alert__header').text()).toBe('Notification');
  });

  it('renders correct content', () => {
    expect(wrapper.find('.dc-alert__content').text()).toBe('Hello World!');
  });

  it('renders arrow on the right', () => {
    expect(wrapper.find('.dc-alert__arrow--right').length).toBe(1);
  });

  it('renders with correct shadow class', () => {
    expect(wrapper.find('.dc-alert--shadow').length).toBe(1);
  });

});
