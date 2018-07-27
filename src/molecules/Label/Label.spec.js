import React from 'react';
import { mount } from 'enzyme';
import Label from './Label';

const labelWrapper = mount(<Label title="Save £35" subTitle="vs a pay-monthly Care Plan" />);

describe('Label', () => {
  it('renders the title', () => {
    expect(labelWrapper.find('.dc-label__title').text()).toBe('Save £35');
  });
  it('renders the sub-title', () => {
    expect(labelWrapper.find('.dc-label__sub-title').text()).toBe('vs a pay-monthly Care Plan');
  });
});
