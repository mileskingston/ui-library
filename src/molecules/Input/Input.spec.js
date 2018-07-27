/* global describe, it */
import React from 'react';
import { mount } from 'enzyme';
import Input from './Input';

const updateValueSpy = jest.fn();
const setup = {
  isRequired: false,
  isValid: true,
  label: 'Testing label',
  updateValue: updateValueSpy
};

describe('Input renders properly,', () => {
  describe('renders all parts', () => {
    const wrapper = mount(
      <Input {...setup} />
    );
    it('renders the input field', () => {
      expect(wrapper.find('input').length).toBe(1);
    });
    it('renders the label', () => {
      expect(wrapper.find('label').length).toBe(1);
    });
    it('calls the updateValue callback', () => {
      wrapper.find('input').simulate('change');
      expect(updateValueSpy).toHaveBeenCalled();
    });
  });
});
