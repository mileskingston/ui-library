/* eslint-disable no-shadow */

import React from 'react';
import { mount } from 'enzyme';
import SearchFieldset from './SearchFieldset';

const setup = (props) => {
  const wrapper = mount(<SearchFieldset {...props} />);
  return {
    props,
    wrapper
  };
};

describe('SearchFieldset', () => {
  const wrapper = setup({
    displaySearch: false,
    onBlur: () => { },
    onChange: () => { },
    onKeyPress: () => { },
    onKeyUp: () => { },
    query: ''
  }).wrapper;
  const input = wrapper.find('input');
  it('has displayName property set', () => {
    expect(SearchFieldset.displayName).toBe('SearchFieldset');
  });
  it('has 3 inputs', () => {
    expect(input.length).toBe(3);
  });
  it('has 2 hidden inputs', () => {
    expect(wrapper.find('input[type="hidden"]').length).toBe(2);
  });
  it('has 1 search input', () => {
    expect(wrapper.find('input[type="search"]').length).toBe(1);
  });
  it('has a button', () => {
    expect(wrapper.find('button[type="submit"]').length).toBe(1);
  });

  describe('Events', () => {
    const onChange = jest.fn();
    const onBlur = jest.fn();
    const onKeyUp = jest.fn();
    const wrapper = setup({
      displaySearch: false,
      onBlur,
      onChange,
      onKeyPress: () => { },
      onKeyUp,
      query: ''
    }).wrapper;
    const node = wrapper.find('input[type="search"]');
    it('change is called once', () => {
      const e = { target: { value: 'some value' } };
      node.simulate('change', e);
      expect(onChange.mock.calls.length).toBe(1);
    });
    it('onKeyUp is called once', () => {
      node.simulate('keyUp', { keyCode: 40 });
      expect(onKeyUp.mock.calls.length).toBe(1);
    });
    it('onBlur is called once', () => {
      node.simulate('blur');
      expect(onBlur.mock.calls.length).toBe(1);
    });
  });
});
