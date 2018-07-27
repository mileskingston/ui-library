/* global describe, it */
import React from 'react';
import { mount } from 'enzyme';

import ComparePanel from './ComparePanel';

describe('CompareBar', () => {
  const products = [
    {
      productID: '10144280',
      productSKU: '161468',
      productName: '55UH850V Smart 3D 4k Ultra HD HDR 55&quot; LED TV',
      imageUrl: 'http://brain-images.cdn.dixons.com/0/8/10144280/s_10144280.jpg',
      productUrl: 'http://kingsm08.fo-currys.fo.dev.dixons.com/gbuk/tv-and-home-entertainment/televisions/televisions/lg-55uh850v-smart-3d-4k-ultra-hd-hdr-55-led-tv-10144280-pdt.html'
    }
  ];
  const buttonClick = jest.fn();
  const wrapper = mount(
    <div>
      <ComparePanel
        products={products}
        title="Comparison list"
        compareLabel="Compare"
        removeLabel="Change"
        buttonClick={buttonClick}
      />
    </div>
  );

  it('renders component', () => {
    expect(wrapper.find('.dc-compare-panel').length).toBe(1);
  });
  it('renders compare bar heading', () => {
    expect(wrapper.find('.dc-compare-panel-heading').text()).toBe('Comparison list');
  });
  it('renders compare bar button text', () => {
    expect(wrapper.find('.dc-compare-panel-button button').text().trim()).toBe('Compare');
  });
  it('renders compare bar remove button text', () => {
    expect(
      wrapper.find('.dc-compare-panel-item .dc-button')
        .first()
        .text()
        .trim()
    )
      .toBe('Change');
  });
  it('buttonClick is called on click', () => {
    wrapper.find('button[type="submit"]').simulate('click');
    expect(buttonClick.mock.calls.length).toBe(1);
  });
  it('renders four items', () => {
    expect(wrapper.find('.dc-compare-panel-item').length).toBe(4);
  });
  it('renders three items with the empty class', () => {
    expect(wrapper.find('.dc-compare-panel-item-empty').length).toBe(3);
  });
  it('renders only one button link', () => {
    expect(wrapper.find('.dc-compare-panel-item .dc-button-link').length).toBe(1);
  });
});
