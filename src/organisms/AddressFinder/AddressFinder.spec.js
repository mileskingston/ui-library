import React from 'react';
import { mount } from 'enzyme';
import './AddressFinder.styl';
import AddressFinder from './AddressFinder';
import FormSimple from '../FormSimple/FormSimple';
import addresses from '../../../mockServer/data/addresses.json';

let addressFinder;
let props;
let initConfig;

function updateValue(value) {
  this.setProps('value', value);
}

beforeAll(() => {
  initConfig = {
    postCode: 'SP10 2AA',
    isRequired: true,
    isValid: true
  };

  props = {
    postCode: initConfig.postCode,
    updateValue: updateValue.bind(addressFinder),
    isRequired: initConfig.isRequired,
    isValid: initConfig.isValid
  };
  addressFinder = mount(
    <FormSimple>
      <AddressFinder {...props} />
    </FormSimple>
  ).find('AddressFinder');
});

describe('Address finder test suite', () => {
  describe('<AddressFinder> initialization', () => {
    it('The props are present after mount phase', () => {
      expect(addressFinder.props()).toBeTruthy();
    });
    it('The value prop is set up', () => {
      expect(addressFinder.prop('value')).toBe(initConfig.value);
    });
    it('The value isRequired is set up', () => {
      expect(addressFinder.prop('isRequired')).toBe(initConfig.isRequired);
    });
    it('The value isValid is set up', () => {
      expect(addressFinder.prop('isValid')).toBe(initConfig.isValid);
    });
    it('The update value has been passed', () => {
      expect(typeof addressFinder.prop('updateValue')).toBe('function');
    });
  });
  describe('<AddressFinder> all components are present after initialization', () => {
    it('The input is present', () => {
      expect(addressFinder.render().find('input[type="text"]').length).toBe(1);
    });
    it('The button is present', () => {
      expect(addressFinder.render().find('button').length).toBe(1);
    });
    it('The input has the correct value set up', () => {
      expect(addressFinder.render().find('input[type="text"]').prop('value'))
        .toBe(initConfig.postCode);
    });
    it('The component gives the address list', () => {
      global.fetch = () => Promise.resolve(addresses);
      expect(addressFinder.find('.dc-dropdown.dc-border').length).toBe(0);
      addressFinder.find('.dc-button-wrapper button').simulate('click');
    });
  });
});
