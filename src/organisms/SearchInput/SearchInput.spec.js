/* global describe, it */
import React from 'react';
import { mount } from 'enzyme';
import SearchInput from './SearchInput';

jest.useFakeTimers();

const onChangeSpy = jest.fn();

const defaultProps = {
  focusAfterClear: false,
  isRequired: false,
  isValid: true,
  label: 'Testing label',
  onChange: onChangeSpy
};

const setup = (props = defaultProps) => mount(
  <SearchInput {...props} />
);

describe('SearchInput renders properly,', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  describe('constructor', () => {
    it('should set default state', () => {
      const expectedDefaultState = {
        isFocused: false
      };
      const state = wrapper.state();

      expect(state).toMatchObject(expectedDefaultState);
    });

    it('should set autofocus props', () => {
      wrapper = setup({
        ...defaultProps,
        autoFocus: true
      });

      const expectedDefaultState = {
        isFocused: true
      };

      const state = wrapper.state();

      expect(state).toEqual(expectedDefaultState);
    });
  });

  describe('shouldComponentUpdate()', () => {
    it('should disallow render if timeout defined', () => {
      const shouldUpdate = wrapper.instance().shouldComponentUpdate(wrapper.props(), {
        timeoutId: 456
      });

      expect(shouldUpdate).toBe(false);
    });

    it('should allow render if timeout undefined', () => {
      const shouldUpdate = wrapper.instance().shouldComponentUpdate(wrapper.props(), {
        timeoutId: undefined
      });

      expect(shouldUpdate).toBe(true);
    });
  });

  describe('Clear input', () => {
    it('should clear input without focus', () => {
      wrapper = setup({
        ...defaultProps,
        value: 'Text to clear'
      });

      const expectedState = {
        isFocused: false,
        clearSearch: false
      };

      wrapper.find('.dc-close').simulate('click');

      const state = wrapper.state();

      expect(state).toEqual(expectedState);
    });

    it('should clear input with focus', () => {
      wrapper = setup({
        ...defaultProps,
        value: 'Text to clear',
        focusAfterClear: true
      });

      const expectedState = {
        isFocused: true,
        clearSearch: false
      };

      wrapper.find('.dc-close').simulate('click');

      const state = wrapper.state();

      expect(state).toEqual(expectedState);
    });
  });

  describe('renders all parts', () => {
    it('renders the input field', () => {
      expect(wrapper.find('input').length).toBe(1);
    });
    it('renders the label', () => {
      expect(wrapper.find('label').length).toBe(1);
    });
    it('renders the close button', () => {
      wrapper = setup({
        ...defaultProps,
        value: 'Text to clear'
      });

      expect(wrapper.find('.dc-close').length).toBe(1);
    });
    it('calls the updateValue callback', () => {
      wrapper.find('input').simulate('change');
      expect(onChangeSpy).toHaveBeenCalled();
    });
  });
});
