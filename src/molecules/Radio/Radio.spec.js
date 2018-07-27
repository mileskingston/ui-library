import React from 'react';
import { mount } from 'enzyme';

import Radio from './Radio';

const wrapper = mount(
  <Radio name="radio_name" />
);

describe('Radio', () => {
  it('renders the container', () => {
    expect(wrapper.find('.dc-radio').length).toBe(1);
  });

  it('renders correct label', () => {
    expect(wrapper.find('.dc-radio-label').length).toBe(1);
  });

  it('renders input radio element', () => {
    expect(wrapper.find('[type="radio"]').length).toBe(1);
  });
});
