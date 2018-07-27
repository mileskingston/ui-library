/* global describe, it */
import React from 'react';
import { mount } from 'enzyme';
import ProductAvailability from './ProductAvailability';

const wrapper = mount(
  <ProductAvailability
    location="SP10 2AA"
    titleLabel="For:"
    collection={{
      available: true,
      label: 'Yes, you can collect today, 1 mile away'
    }}
    delivery={{
      available: false,
      label: 'Delivery not available'
    }}
  />
);

describe('ProductAvailability', () => {

  it('renders component', () => {
    expect(wrapper.find('.dc-product-availability').length).toBe(1);
  });

  it('renders correct title with location', () => {
    expect(wrapper.find('.dc-product-availability__title').text()).toEqual('For: SP10 2AA');
  });

  it('renders correct "collection" label and icon', () => {
    expect(wrapper.find('.dc-list__item').first().find('.dc-icon-cross').length).toBe(1);
    expect(wrapper.find('.dc-list__item').first().text()).toEqual('Delivery not available');
  });

  it('renders correct "delivery" label and icon', () => {
    expect(
      wrapper.find('.dc-list__item').last().find('.dc-icon-tick').length
    ).toBe(1);
    expect(
      wrapper.find('.dc-list__item').last().text()
    ).toEqual('Yes, you can collect today, 1 mile away');
  });

});
