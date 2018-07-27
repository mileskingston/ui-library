/* global describe, it */
import React from 'react';
import { mount } from 'enzyme';

import Link from './Link';

describe('Link renders properly', () => {
  const wrapper = mount(
    <Link
      label="testing label"
      path="/test/path"
      icon="Spinner"
      showArrow
      showBorder
      isActive
    />
  );
  it('renders the proper tag', () => {
    expect(wrapper.find('a').length).toBe(1);
  });
  it('renders the label', () => {
    expect(wrapper.find('.dc-link-label').length).toBe(1);
  });
});
