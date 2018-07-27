import React from 'react';
import { mount } from 'enzyme';
import FooterCompanyDetails from './FooterCompanyDetails';

const setup = (props) => {
  const wrapper = mount(<FooterCompanyDetails {...props} />);
  return {
    props,
    wrapper
  };
};

describe('FooterCompanyDetails', () => {
  const wrapper = setup({
    companyDetails: '<span>some footer html</span>'
  }).wrapper;
  it('has displayName property set', () => {
    expect(FooterCompanyDetails.displayName).toBe('FooterCompanyDetails');
  });
  it('has correct component name defined', () => {
    expect(wrapper.find('[data-component="FooterCompanyDetails"]').length).toBe(1);
  });
  it('has correct rendered html', () => {
    expect(wrapper.find('[data-component="FooterCompanyDetails"]').html())
      .toEqual('<div data-component="FooterCompanyDetails"><span>some footer html</span></div>');
  });
});
