import React from 'react';
import { mount } from 'enzyme';
import SlideWrapper from './SlideWrapper';

const setup = (props, children) => {
  const wrapper = mount(
    <SlideWrapper {...props}>
      <div>Foo</div>
    </SlideWrapper>
  );
  return {
    props,
    wrapper
  };
};

const HIDDEN_FIXED_CONTENT_CLASS = 'slide-wrapper-hidden-fixed-content';

describe('SlideWrapper', () => {
  it('has displayName property set', () => {
    expect(SlideWrapper.displayName).toBe('SlideWrapper');
  });

  it(`adds .${HIDDEN_FIXED_CONTENT_CLASS} to <html> on initial load`, () => {
    setup();
    const htmlElClassName = document.querySelector('html').className;
    expect(htmlElClassName.includes(HIDDEN_FIXED_CONTENT_CLASS)).toBe(true);
  });

  it(`removes .${HIDDEN_FIXED_CONTENT_CLASS} from <html> on sliding`, () => {
    const { wrapper } = setup();
    wrapper.setProps({ sliding: true });
    const htmlElClassName = document.querySelector('html').className;
    expect(htmlElClassName.includes(HIDDEN_FIXED_CONTENT_CLASS)).toBe(false);
  });
});
