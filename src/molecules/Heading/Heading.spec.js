/* global describe, it */
import React from 'react';
import { mount } from 'enzyme';

import { H1 } from './Heading';

const wrapper = mount(
  <H1 icon="MyOrders">My orders</H1>
);

describe('Heading H1', () => {

  describe('tag', () => {
    it('is correct level', () => {
      expect(wrapper.find('h1').length).toBe(1);
    });
  });

  describe('title', () => {
    it('is displayed', () => {
      expect(wrapper.find('.dc-heading-text').text()).toBe('My orders');
    });
  });

  describe('icon', () => {
    it('is displayed', () => {
      expect(wrapper.find('.dc-heading-icon').length).toBe(1);
    });
  });
});
