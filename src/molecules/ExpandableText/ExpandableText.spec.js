import React from 'react';
import { mount } from 'enzyme';

import ExpandableText from './ExpandableText';

describe('ExpandableText renders properly', () => {
  const wrapper = mount(
    <ExpandableText
      textLess="Less"
      textMore="More"
    >
      Expanded text.
    </ExpandableText>
  );

  it('renders the proper tag', () => {
    const span = wrapper.find('span.dc-expandable-text');
    expect(span.length).toBe(1);
    expect(span.is('.dc-expandable-text--expanded')).toBe(false);
  });

  it('renders only more link', () => {
    expect(wrapper.find('span').text().trim()).toBe('More');
  });

  it('toggles the text', () => {
    const link = () => wrapper.find('a');
    const span = () => wrapper.find('span');

    expect(span().is('.dc-expandable-text--expanded')).toBe(false);

    link().simulate('click');
    expect(span().is('.dc-expandable-text--expanded')).toBe(true);
    expect(span().text()).toContain('Expanded text.');
    expect(span().find('span').text()).toContain('Less');

    link().simulate('click');
    expect(span().is('.dc-expandable-text--expanded')).toBe(false);
    expect(span().text().trim()).toBe('More');
  });
});
