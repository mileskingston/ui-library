/* global describe, it, afterEach, beforeEach */
import React from 'react';
import { mount } from 'enzyme';

import { Sticky, StickyContainer } from './Sticky';

const wrapper = mount(
  <StickyContainer>
    <Sticky>
      <div className="sticky-element">Sticky element</div>
    </Sticky>
  </StickyContainer>
);

describe('Sticky, ', () => {
  it('renders the container', () => {
    expect(wrapper.find('.dc-sticky').length).toBeGreaterThanOrEqual(1);
  });
  it('renders the children', () => {
    expect(wrapper.find('.sticky-element').length).toBeGreaterThanOrEqual(1);
  });
});
