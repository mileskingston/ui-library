/* global describe, it, beforeEach, afterEach */
import React from 'react';
import { mount } from 'enzyme';

import SearchList from './SearchList';

let wrapper;

const defaultProps = {
  activeItemIndex: -1,
  displayHistory: false,
  displaySuggestions: false,
  error: null,
  historyItems: [],
  onMouseEnter: () => {},
  onMouseLeave: () => {},
  onSelection: () => {},
  searchHistory: [],
  searchHistoryLabel: '',
  searchItems: []
};

const setup = (props = defaultProps) => mount(
  <SearchList {...props} />
);

describe('SearchList component', () => {

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }

    jest.restoreAllMocks();
  });

  it('should have a display name set', () => {
    expect(SearchList.displayName).toBe('SearchList');
  });

  describe('render()', () => {
    it('should not display search list if there are no items', () => {
      const props = Object.assign({}, defaultProps, {
        searchHistory: [],
        searchItems: []
      });

      wrapper = setup(props);

      expect(wrapper.find('[data-element="SearchList"]').length).toBe(0);
    });

    it('should display list of searchItems when not empty', () => {
      const props = Object.assign({}, defaultProps, {
        searchHistory: [],
        searchItems: ['Item 1', 'Item 2', 'Item 3']
      });

      wrapper = setup(props);

      expect(wrapper.find('[data-element="Item"]').length).toBe(3);
    });

    it('should display list of searchHistory items when configured', () => {
      const props = Object.assign({}, defaultProps, {
        displayHistory: true,
        searchHistory: ['HItem 1', 'HItem 2'],
        searchItems: []
      });

      wrapper = setup(props);

      expect(wrapper.find('[data-element="Item"]').length).toBe(2);
    });

    it('should display item description if provided', () => {
      const props = Object.assign({}, defaultProps, {
        searchHistory: [],
        searchItems: [
          { text: 'Item 1', description: 'Item description 1' },
          { text: 'Item 2', description: 'Item description 2' },
          { text: 'Item 3', description: 'Item description 3' }
        ]
      });

      wrapper = setup(props);

      wrapper.find('[data-element="SubHeadingText"]').forEach((description, idx) => {
        expect(description.text().trim()).toEqual(props.searchItems[idx].description);
      });
    });

    it('should set active item', () => {
      const props = Object.assign({}, defaultProps, {
        activeItemIndex: 1,
        searchHistory: [],
        searchItems: ['Item 1', 'Item 2', 'Item 3']
      });

      wrapper = setup(props);
      const activeItem = wrapper.find('[data-active=true]');

      expect(activeItem.text()).toEqual(props.searchItems[props.activeItemIndex]);
    });

    it('should select item when clicked', () => {
      const props = Object.assign({}, defaultProps, {
        onSelection: jest.fn(),
        searchHistory: [],
        searchItems: ['Item 1']
      });

      wrapper = setup(props);
      wrapper.find('[data-element="Item"]').simulate('click');

      expect(props.onSelection.mock.calls[0][0]).toEqual(props.searchItems[0]);
    });

    it('should handle mouseEnter event on list item', () => {
      const props = Object.assign({}, defaultProps, {
        onMouseEnter: jest.fn(),
        searchHistory: [],
        searchItems: ['Item 1']
      });

      wrapper = setup(props);
      wrapper.find('[data-element="Item"]').simulate('mouseenter');

      expect(props.onMouseEnter).toHaveBeenCalled();
    });

    it('should handle mouseLeave event on list item', () => {
      const props = Object.assign({}, defaultProps, {
        onMouseLeave: jest.fn(),
        searchHistory: [],
        searchItems: ['Item 1']
      });

      wrapper = setup(props);
      wrapper.find('[data-element="Item"]').simulate('mouseleave');

      expect(props.onMouseLeave).toHaveBeenCalled();
    });
  });
});
