import React from 'react';
import { mount } from 'enzyme';
import ProductPriceBlock from './ProductPriceBlock';

const priceBlocksWrapper = mount(
  <div>
    <div id="product-price-block-1">
      <ProductPriceBlock currentPrice="100" savingsPrice="50" wasPrice="150" />
    </div>
    <div id="product-price-block-2">
      <ProductPriceBlock
        isBundle
        currentPrice="269.00"
        mainProductSaving="50"
        mainProductWasPrice={219.99}
        mainProductWasPriceFrom="04/05/17"
        mainProductWasPriceTo="10/07/17"
        mainProductCurrentPrice="249.99"
        savingsPrice="39.99"
      />
    </div>
  </div>
);

describe('ProductPriceBlock', () => {
  it('renders correctly product price block without bundle', () => {
    expect(priceBlocksWrapper.find(
      '#product-price-block-1 .dc-product-price-block__current-price'
    ).text()).toBe('£100');

    expect(priceBlocksWrapper.find(
      '#product-price-block-1 .dc-product-price-block__was-and-save-prices__was-price'
    ).text()).toBe('Was £150 ');

    expect(priceBlocksWrapper.find(
      '#product-price-block-1 .dc-product-price-block__was-and-save-prices__save-price'
    ).text()).toBe('save £50');

  });
  it('renders renders correctly product price block with bundle', () => {
    expect(priceBlocksWrapper.find(
      '#product-price-block-2 .dc-product-price-block__current-price'
    ).text()).toBe('£269.00');

    expect(priceBlocksWrapper.find(
      '#product-price-block-2 .dc-product-price-block-bundle__main-product-price'
    ).text()).toBe('Main product was £219.99');

    expect(priceBlocksWrapper.find(
      '#product-price-block-2 .dc-product-price-block-bundle__from-to-dates'
    ).text()).toBe('(from 04/05/17 to 10/07/17),');

    expect(priceBlocksWrapper.find(
      '#product-price-block-2 .dc-product-price-block-bundle__now-and-save-prices__now-price'
    ).text()).toBe('now £249.99. ');

    expect(priceBlocksWrapper.find(
      '#product-price-block-2 .dc-product-price-block-bundle__now-and-save-prices__save-price'
    ).text()).toBe('Save £50');
  });
});
