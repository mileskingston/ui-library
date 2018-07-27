/* eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';
import Footer from './Footer';

const someLinks = [{
  title: 'Customer services',
  links: [{
    label: 'Delivery & Recycling',
    link: 'https://www.currys.co.uk/gbuk/delivery-1021-theme.html'
  }, {
    label: 'Track my order',
    link: 'https://www.currys.co.uk/gbuk/track-your-order-1028-theme.html'
  }]
}, {
  title: 'Shopping with Currys',
  links: [{
    label: 'Order online & collect in store',
    link: 'https://www.currys.co.uk/gbuk/order-and-collect-1024-theme.html'
  }]
}];

const setup = (props) => {
  const wrapper = shallow(<Footer {...props} />);
  return {
    props,
    wrapper
  };
};

describe('Footer', () => {
  const { wrapper } = setup({
    links: someLinks,
    companyDetails: ''
  });
  it('has displayName property set', () => {
    expect(Footer.displayName).toBe('Footer');
  });
  it('has correct component name defined', () => {
    expect(wrapper.find('[data-component="Footer"]').length).toBe(1);
  });
  it('has correct component number of columns for links', () => {
    expect(wrapper.find('[data-component="Footer"] [data-element="Column"]').length).toBe(2);
  });
  it('has correct component number of items in columns', () => {
    expect(wrapper.find('[data-component="Footer"] [data-element="Column"]')
      .first().find('[data-element="Item"]').length).toBe(3);
    expect(wrapper.find('[data-component="Footer"] [data-element="Column"]')
      .first().last('[data-element="Item"]').length).toBe(1);
  });
  it('has correct labels on header', () => {
    expect(wrapper.find('[data-component="Footer"] [data-element="Column"]')
      .first().find('[data-element="Item"] > h5').text()).toEqual('Customer services');
    expect(wrapper.find('[data-component="Footer"] [data-element="Column"]')
      .last().find('[data-element="Item"] > h5').text()).toEqual('Shopping with Currys');
  });
  it('has correct text on links', () => {
    expect(wrapper.find('[data-component="Footer"] [data-element="Column"]')
      .first().find('[data-element="Item"] > a').first().text()).toEqual('Delivery & Recycling');
    expect(wrapper.find('[data-component="Footer"] [data-element="Column"]')
      .first().find('[data-element="Item"] > a').last().text()).toEqual('Track my order');
    expect(wrapper.find('[data-component="Footer"] [data-element="Column"]')
      .last().find('[data-element="Item"] > a')
      .first().text()).toEqual('Order online & collect in store');
  });
  it('has a store finder', () => {
    expect(wrapper.find('[data-component="Footer"] [data-element="StoreFinderWrapper"]')
      .length).toBe(1);
  });
});
