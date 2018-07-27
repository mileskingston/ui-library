/* global describe, it */
import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';

function setup(props, children) {
  const wrapper = shallow(<Button {...props}>{children}</Button>);
  return {
    props,
    wrapper
  };
}

describe('Button', () => {
  it('has displayName property set', () => {
    expect(Button.displayName).toBe('Button');
  });

  describe('click event', () => {
    it('is called once', () => {
      const onButtonClick = jest.fn();
      const { wrapper } = setup({
        onClick: onButtonClick
      }, 'Click me!');
      const button = wrapper.find('button');
      button.simulate('click');
      expect(onButtonClick.mock.calls.length).toBe(1);
    });
  });

  describe('label', () => {
    it('is displayed', () => {
      const { wrapper } = setup(null, 'primary');
      const button = wrapper.find('button');
      expect(button.text()).toMatch('primary ');
    });
  });

  describe('attributes', () => {
    describe('default attributes', () => {
      const { wrapper } = setup(undefined, 'Click me!');
      const button = wrapper.find('button');
      it('component defined', () => {
        expect(button.find('[data-component="Button"]').length).toEqual(1);
      });
      it('disabled is false', () => {
        const { wrapper: wrapperInner } = setup(undefined, 'Click me!');
        const buttonInner = wrapperInner.render().find('button');
        expect(buttonInner.get(0).attribs.disabled).toBe(undefined);
      });
      it('type is button', () => {
        expect(button.find('button').length).toEqual(1);
      });
    });
  });

  describe('content', () => {
    const { wrapper } = setup({ type: 'button' }, (<span>Some content</span>));
    const button = wrapper.find('button');
    it('content is displayed', () => {
      expect(button.find('span').length).toEqual(2);
    });
  });
});
