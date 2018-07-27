import React from 'react';
import { mount } from 'enzyme';
import PriceBlock from './PriceBlock';

const priceBlocksWrapper = mount(
  <div>
    <div id="price-block-1">
      <PriceBlock price={20.5} />
    </div>
    <div id="price-block-2">
      <PriceBlock price="£20.50" />
    </div>
    <div id="price-block-3">
      <PriceBlock title="Save" price="£20.50" info="a month" />
    </div>
  </div>
);

describe('PriceBlock', () => {
  it('renders numeric price in correct format', () => {
    expect(priceBlocksWrapper.find('#price-block-1 .dc-price-block__price').text()).toBe('£20.50');
  });
  it('renders formatted string price as formatted string', () => {
    expect(priceBlocksWrapper.find('#price-block-2 .dc-price-block__price').text()).toBe('£20.50');
  });
  it('renders title, price and info', () => {
    expect(priceBlocksWrapper.find('#price-block-3').text()).toBe('Save £20.50 a month');
  });
});
