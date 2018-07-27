import React from 'react';
import { mount } from 'enzyme';
import ProductSwatchesMultiple from './ProductSwatchesMultiple';
import mockData from './mocks/productVariants.json';

const setup = (props) => {
  const wrapper = mount(<ProductSwatchesMultiple {...props} />);
  return {
    props,
    wrapper
  };
};

let wrapper = null;

describe('ProductSwatches', () => {
  const onSwatchClick = jest.fn();

  beforeAll(() => {
    const result = setup({
      productSwatches: mockData.productVariants,
      onSwatchClick: onSwatchClick
    });
    wrapper = result.wrapper;
  });

  it('has displayName property set', () => {
    expect(ProductSwatchesMultiple.displayName).toBe('ProductSwatchesMultiple');
  });

  it('renders multiple instance of ProductSwatches component', () => {
    expect(wrapper.find('[data-component="ProductSwatches"]').length)
      .toBe(mockData.productVariants.length);
  });

  it('calls onSwatchClick when clicking on specific swatch', () => {
    wrapper.find('.dc-product-swatch').first().simulate('click');
    expect(onSwatchClick).toHaveBeenCalled();
  });
});
