/* global describe, it, before */
import React from 'react';
import { mount } from 'enzyme';
import Placeholder from './Placeholder';

const wrapper = mount(
  <Placeholder
    withImage
    withContent
    loadingAnimation
    numberOfLines={5}
  />
);

describe('Placeholder', () => {
  it('renders component', () => {
    expect(wrapper.find('.dc-placeholder').length).toBe(1);
  });

  it('had correct class when loading animation is enabled', () => {
    expect(wrapper.find('.dc-placeholder--loading').length).toBe(1);
  });

  it('renders placeholder for image', () => {
    expect(wrapper.find('.dc-placeholder__image').length).toBe(1);
  });

  it('renders placeholder for content', () => {
    expect(wrapper.find('.dc-placeholder__content').length).toBe(1);
  });

  it('has correct number of placeholder lines', () => {
    expect(wrapper.find('.dc-placeholder__line').length).toBe(5);
  });

});
