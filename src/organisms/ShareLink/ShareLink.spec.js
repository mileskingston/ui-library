import React from 'react';
import { mount } from 'enzyme';

import ShareLink from './ShareLink';

const wrapper = mount(
  <ShareLink
    service="facebook"
    shareUrl="www.currys.co.uk/product.html"
  />
);

describe('Steps, ', () => {
  it('renders the container', () => {
    expect(wrapper.find('.dc-share-link').length).toEqual(1);
  });
  it('renders the children', () => {
    expect(wrapper.find('.dc-icon').length).toEqual(1);
    expect(wrapper.find('.dc-icon-facebook').length).toEqual(1);
    expect(wrapper.find('.dc-link').length).toEqual(1);
  });
});
