/* global describe, it */
import React from 'react';
import { mount } from 'enzyme';
import ComparePanelProduct from './ComparePanelProduct';

describe('ComparePanelProduct', () => {

  const product = {
    imageUrl: 'http://via.placeholder.com/112x99',
    productName: 'BREVILLE Impressions VTT470 4-Slice Toaster - White',
    productUrl: 'http://www.currys.co.uk/gbuk/household-appliances/small-kitchen-appliances/toasters/breville-impressions-vtt702-4-slice-toaster-vanilla-cream-10133883-pdt.html#srcid=11026'
  };

  const wrapper = mount(
    <ComparePanelProduct
      imageUrl={product.imageUrl}
      productName={product.productName}
      productUrl={product.productUrl}
    />
  );

  it('renders component class compare', () => {
    expect(wrapper.find('.dc-compare-panel-product').length).toBe(1);
  });
  it('renders product url in anchor href', () => {
    expect(wrapper.find('a').prop('href'))
      .toBe('http://www.currys.co.uk/gbuk/household-appliances/small-kitchen-appliances/toasters/breville-impressions-vtt702-4-slice-toaster-vanilla-cream-10133883-pdt.html#srcid=11026');
  });
});
