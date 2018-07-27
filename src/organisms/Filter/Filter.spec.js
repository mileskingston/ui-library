/* global describe, it */
import React from 'react';
import { mount } from 'enzyme';

import Filter from './Filter';

const spyOnTheReducer = jest.fn();

function setupWrapper() {
  return mount(<Filter filterHandler={spyOnTheReducer} visibleItemsCount={10} />);
}

describe('Initialization works properly', () => {
  describe('Behaviour of the input in the filter', () => {
    it('Input is present', () => {
      const wrapper = setupWrapper();
      expect(wrapper.find('Filter').length).toBe(1);
    });
    it('Updates the value and state', (done) => {
      const wrapper = setupWrapper();
      wrapper.instance().handleChange('test');
      expect(wrapper.state().value).toBeTruthy();
      expect(wrapper.state().value).toBe('test');
      setTimeout(() => {
        expect(spyOnTheReducer).toHaveBeenCalled();
        done();
      }, 400);
    });
  });
});

describe('Module behaves properly', () => {
  it('Show the spinner while searching', () => {
    const wrapper = setupWrapper();
    wrapper.instance().handleChange('test');
    wrapper.update();
    expect(wrapper.find('.dc-filter-spinner').length).toBe(1);
  });
});
