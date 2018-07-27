import React from 'react';
import { shallow } from 'enzyme';
import StoreFinder from './StoreFinder';

const setup = (props) => {
  const wrapper = shallow(<StoreFinder {...props} />);
  return {
    props,
    wrapper
  };
};

describe('StoreFinder', () => {
  const wrapper = setup({
    heading: 'some heading',
    description: 'some description',
    buttonText: 'some button',
    storeFinderURL: 'http://somelink.example'
  }).wrapper;
  it('has displayName property set', () => {
    expect(StoreFinder.displayName).toBe('StoreFinder');
  });
  it('has correct component name defined', () => {
    expect(wrapper.find('[data-component="StoreFinder"]').length).toBe(1);
  });
  it('has a header', () => {
    expect(wrapper
      .find('[data-component="StoreFinder"] > [data-element="Heading"]')
      .length).toBe(1);
  });
  it('has a description', () => {
    expect(wrapper
      .find('[data-component="StoreFinder"] > [data-element="Description"]')
      .length).toBe(1);
  });
  it('has a button', () => {
    expect(wrapper
      .find('[data-component="StoreFinder"] > [data-element="Button"]')
      .length).toBe(1);
  });
  it('has a UK map', () => {
    expect(wrapper
      .find('[data-component="StoreFinder"] > [data-element="UkMap"]')
      .length).toBe(1);
  });
  it('has correct header text', () => {
    expect(wrapper
      .find('[data-component="StoreFinder"] > [data-element="Heading"]')
      .text()).toEqual('some heading');
  });
  it('has correct description text', () => {
    expect(wrapper
      .find('[data-component="StoreFinder"] > [data-element="Description"]')
      .text()).toEqual('some description');
  });
  it('has correct button text', () => {
    expect(wrapper
      .find('[data-component="StoreFinder"] [data-element="Link"] span')
      .last().text()).toEqual('some button');
  });
});
