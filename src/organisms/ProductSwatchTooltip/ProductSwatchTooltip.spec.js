import React from 'react';
import { mount } from 'enzyme';
import ProductSwatchTooltip from './ProductSwatchTooltip';
import mockData from '../ProductSwatchesMultiple/mocks/productVariants.json';

const setup = (props) => {
  const wrapper = mount(<ProductSwatchTooltip {...props} />);
  return {
    props,
    wrapper
  };
};

let wrapper = null;

describe('ProductSwatchTooltip', () => {

  beforeAll(() => {
    const result = setup({
      product: mockData.productVariants[0].variants[0],
      priceSaveTranslate: 'save',
      outOfStockTranslate: 'Out of stock',
      emailMeWhenBackInStockTranslate: 'Email me when back in stock'
    });

    wrapper = result.wrapper;
  });

  it('has displayName property set', () => {
    expect(ProductSwatchTooltip.displayName).toBe('ProductSwatchTooltip');
  });

  it('renders LazyLoadedImage', () => {
    expect(wrapper.find('.dc-lazy-loaded-image').length).toBe(1);
  });

  it('renders list of product features', () => {
    expect(wrapper.find('.dc-product-tooltip-feature').length).toBeGreaterThan(0);
  });

  it('renders product price', () => {
    expect(wrapper.find('.dc-product-tooltip-price').length).toBe(1);
  });

  it('renders saving price', () => {
    expect(wrapper.find('.dc-product-tooltip-saving').length).toBe(1);
  });

  it('renders was price', () => {
    expect(wrapper.find('.dc-product-tooltip-was-price').length).toBe(1);
  });

  it('renders out of stock message', () => {
    expect(wrapper.find('.dc-product-tooltip-stock-info').length).toBe(1);
  });

  it('renders email me when back in stock message', () => {
    expect(wrapper.find('.dc-product-tooltip-email-back').length).toBe(1);
  });
});
