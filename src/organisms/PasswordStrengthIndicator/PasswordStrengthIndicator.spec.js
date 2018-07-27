/* global describe, it */
import React from 'react';
import { mount } from 'enzyme';

import PasswordStrengthIndicator from './PasswordStrengthIndicator';

const settings = {
  weakMin: 6,
  goodMin: 8,
  strongMin: 10
};

const blacklist = ['forbidden'];

const password = 'goodPassword123';
const setup = {
  settings,
  password,
  blacklist
};

const wrapper = mount(
  <PasswordStrengthIndicator {...setup} />
);

describe('Password strength indicator, ', () => {
  it('renders the container', () => {
    expect(wrapper.find('.dc-psi').length).toBeGreaterThanOrEqual(1);
  });
  it('the strength announced is correct', () => {
    const passwordInner = 'goodPassword1234';
    wrapper.setProps({ password: passwordInner });
    expect(wrapper.find('.dc-psi').get(0).props.className).toMatch(/dc-psi-strength-3/);
  });
});
