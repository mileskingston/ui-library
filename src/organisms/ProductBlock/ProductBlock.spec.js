/* global describe, it */
import React from 'react';
import { mount } from 'enzyme';
import ProductBlock from './ProductBlock';

const product = {
  imageUrl: 'http://brain-images.cdn.dixons.com/8/9/10135898/u_10135898.jpg',
  productName: 'MORPHY RICHARDS Accents 242002 4-Slice Toaster - Black',
  price: '£32.98',
  savePrice: 'Save £2.50',
  wasPrice: 'Was £35.48 (from 12/02/15 to 24/05/15)',
  rating: 7.5,
  ratingCount: 154
};

const wrapper = mount(
  <ProductBlock product={product} />
);

describe('ProductBlock', () => {

  it('renders component', () => {
    expect(wrapper.find('.dc-product-block').length).toBe(1);
  });

  it('renders product title', () => {
    expect(wrapper.find('.dc-product-block-title').text()).toEqual(product.productName);
  });

  it('renders product image', () => {
    expect(wrapper.find('.dc-product-block-image').length).toBe(1);
  });

  it('renders correct product price', () => {
    expect(wrapper.find('.dc-product-block-price').text()).toEqual(product.price);
  });

  it('renders correct save price', () => {
    expect(wrapper.find('.dc-product-block-save-price').text()).toEqual(product.savePrice);
  });

  it('renders correct was price', () => {
    expect(wrapper.find('.dc-product-block-was-price').text()).toEqual(product.wasPrice);
  });

  it('renders rating component', () => {
    expect(wrapper.find('.dc-rating').length).toBe(1);
  });

  it('renders number of reviews', () => {
    expect(wrapper.find('.dc-rating').length).toBe(1);
  });

});
