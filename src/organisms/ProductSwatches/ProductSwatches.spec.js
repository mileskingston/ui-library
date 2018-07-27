import React from 'react';
import { mount } from 'enzyme';
import ProductSwatches from './ProductSwatches';
import ProductSwatchTooltip from '../ProductSwatchTooltip/ProductSwatchTooltip';
import mockData from '../ProductSwatchesMultiple/mocks/productVariants.json';

const setup = (props) => {
  const wrapper = mount(<ProductSwatches {...props} />);
  return {
    props,
    wrapper
  };
};

let wrapper = null;

describe('ProductSwatches', () => {
  beforeAll(() => {
    const result = setup({
      ...mockData.productVariants[0]
    });
    wrapper = result.wrapper;
  });

  it('has displayName property set', () => {
    expect(ProductSwatches.displayName).toBe('ProductSwatches');
  });

  it('renders product swatches list', () => {
    expect(wrapper.find('.dc-product-swatch').length).toBe(
      mockData.productVariants[0].variants.length
    );
  });

  it('renders one active product swatch', () => {
    expect(wrapper.find('.dc-product-swatch-active').length).toBe(1);
  });

  it('renders tooltip when swatchTooltipFupid is set', () => {
    wrapper.setState({
      swatchTooltipFupid: `${mockData.productVariants[0].variants[0].fupid}`
    });
    expect(wrapper.find(ProductSwatchTooltip).length).toBe(1);
  });
});
