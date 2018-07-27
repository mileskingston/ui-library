/* global describe, it */
import React from 'react';
import { mount } from 'enzyme';
import LazyLoadedImage from './LazyLoadedImage';

describe('LazyLoadedImage', () => {
  const lazyLoadedImageSource = {
    imageUrl: 'http://via.placeholder.com/112x99',
    productName: 'BREVILLE Impressions VTT470 4-Slice Toaster - White'
  };

  const wrapper = mount(
    <LazyLoadedImage
      src={lazyLoadedImageSource.imageUrl}
      alt={lazyLoadedImageSource.productName}
    />
  );

  it('renders component main class', () => {
    expect(wrapper.find('.dc-lazy-loaded-image').length).toBe(1);
  });
  it('renders Loader on initial render', () => {
    expect(wrapper.find('Loader').length).toBe(1);
  });
});
