/* global describe, it */
import React from 'react';
import { mount } from 'enzyme';
import Rating from './Rating';

const wrapper = mount(
  <Rating
    maxCount={5}
    ratingCount={12}
    ratingValue={7.2}
  />
);

describe('Rating, ', () => {
  it('renders the block', () => {
    expect(wrapper.find('.dc-rating').length).toBeGreaterThanOrEqual(1);
  });
  it('renders correct number of items', () => {
    expect(wrapper.find('.dc-rating-item').length).toBe(5);
  });
  it('renders correct number of active items', () => {
    expect(wrapper.find('.dc-rating-item--active').length).toBe(3);
  });
  it('renders correct class for half item', () => {
    expect(wrapper.find('.dc-rating-item--half').length).toBe(1);
  });
  it('renders correct count of ratings', () => {
    expect(wrapper.find('.dc-rating-count').text()).toBe('(12)');
  });
});
