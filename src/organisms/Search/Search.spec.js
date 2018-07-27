/* global describe, it, beforeEach, afterEach */
import React from 'react';
import { mount } from 'enzyme';

import Search from './Search';

let wrapper;

const defaultProps = {
  activeItemIndex: -1,
  autosubmit: false,
  ariaLabel: 'A label',
  classes: 'a-class',
  clearSearch: jest.fn(),
  error: null,
  handleMouseLeaveOption: jest.fn(),
  onBlur: jest.fn(),
  onChange: jest.fn(),
  onFocus: jest.fn(),
  onKeyDown: jest.fn(),
  onSelection: jest.fn(),
  placeholder: 'a placeholder',
  prefill: 0,
  processing: false,
  searchHistory: [],
  searchHistoryLabel: 'search history label',
  searchIcon: true,
  searchItems: [],
  searchText: '',
  setActiveItem: jest.fn()
};

const setup = (props = defaultProps) => mount(
  <Search {...props} />
);

describe('Search component', () => {
  it('should have display name set', () => {
    expect(Search.displayName).toEqual('Search');
  });

  describe('render()', () => {
    it('should render SearchInput', () => {
      wrapper = setup();
      expect(wrapper.find('[data-component="SearchInput"]').length).toEqual(1);
    });

    it('should render SearchList', () => {
      const props = Object.assign({}, defaultProps, {
        searchHistory: ['Item 1', 'Item 2'],
        searchText: ''
      });

      wrapper = setup(props);
      wrapper.setState({
        displaySuggestions: true
      });

      expect(wrapper.find('[data-component="SearchList"]').length).toEqual(1);
    });
  });
});
