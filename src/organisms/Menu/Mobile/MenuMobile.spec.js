import React from 'react';
import { mount } from 'enzyme';
import MenuMobile from './MenuMobile';
import navAPIResponse from '../mocks/tree.json';

const setup = (props) => {
  const wrapper = mount(<MenuMobile {...props} />);
  return {
    props,
    wrapper
  };
};

let wrapper = null;

describe('MenuMobile', () => {
  
  beforeAll(() => {
    const result = setup({
      menuItemClick: () => {},
      tree: navAPIResponse.payload
    });
    wrapper = result.wrapper;
  });

  const selectedItems = [{
    index: 0,
    el: {
      label: 'Kitchen Appliances',
      targetType: 'ucms',
      link: 'https://localhost',
      nav: undefined
    }
  },
  {
    index: 1,
    el: {
      label: 'Laundry',
      link: 'https://localhost',
      targetType: 'ucms',
      nav: undefined
    }
  }
  ];

  it('has displayName property set', () => {
    expect(MenuMobile.displayName).toBe('MenuMobile');
  });

  describe('Items', () => {
    it('update state on click by pushing element into array', () => {
      wrapper.setState({
        selections: []
      });
      const itemLevel1 =
        wrapper.find('[data-element="Column"]')
          .at(0)
          .find('li')
          .at(1)
          .find('a')
          .first();
      itemLevel1.simulate('click');
      expect(wrapper.state().selections.length).toBe(1);
    });
  });

  describe('Toolbar', () => {
    it('is hidden when nothing is selected', () => {
      wrapper.setState({
        selections: []
      });
      expect(wrapper.find('[data-element="Toolbar"]').length).toBe(0);
    });

    it('is visible when something is selected', () => {
      wrapper.setState({
        selections: [selectedItems[0]]
      });
      expect(wrapper.find('[data-element="Toolbar"]').length).toBe(1);
    });

    describe('BackButton', () => {
      it('updates state by removing one item from array', () => {
        wrapper.setState({
          selections: selectedItems
        });
        wrapper.find('[data-element="BackButton"]').simulate('click');
        expect(wrapper.state().selections.length).toBe(1);
      });
    });
  });

  describe('Breadcrumbs', () => {
    it('are hidden when nothing is selected', () => {
      wrapper.setState({
        selections: []
      });
      expect(wrapper.find('[data-element="Breadcrumbs"]').length).toBe(0);
    });

    it('are visible when something is selected', () => {
      wrapper.setState({
        selections: selectedItems
      });
      expect(wrapper.find('[data-element="Breadcrumbs"]').length).toBe(1);
    });

    it('have correct title', () => {
      expect(
        wrapper.find('[data-element="Breadcrumbs"]').text()
      ).toEqual('Kitchen Appliances / Laundry');
    });

    describe('ProductListingButton', () => {
      it('is hidden for 2nd level menu', () => {
        wrapper.setState({
          selections: [selectedItems[0]]
        });
        expect(wrapper.find('[data-element="ProductListingButton"]').length).toBe(0);
      });

      it('is visible for 3rd level menu', () => {
        wrapper.setState({
          selections: selectedItems
        });
        expect(wrapper.find('[data-element="ProductListingButton"]').length).toBe(1);
      });
    });
  });

});
