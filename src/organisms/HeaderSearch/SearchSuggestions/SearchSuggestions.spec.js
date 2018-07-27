import React from 'react';
import { shallow } from 'enzyme';
import SearchSuggestions from './SearchSuggestions';

const setup = (props) => {
  const wrapper = shallow(<SearchSuggestions {...props} />);
  return {
    props,
    wrapper
  };
};

describe('SearchSuggestions', () => {
  const wrapper = setup({
    cursor: -1,
    query: null,
    results: [],
    selectItem: () => { },
    updateQuery: () => { }
  }).wrapper;

  it('has displayName property set', () => {
    expect(SearchSuggestions.displayName).toBe('SearchSuggestions');
  });

  it('has correct component name', () => {
    expect(wrapper.find('[data-component="SearchSuggestions"]').length).toBe(1);
  });

  describe('has correct display set', () => {
    it('to be hidden when no query is filled', () => {
      expect(wrapper.hasClass('dc-search-suggestions--hidden')).toBe(true);
    });
    it('to be hidden when no results are available', () => {
      wrapper.setProps({ query: 'query', results: [] });
      expect(wrapper.hasClass('dc-search-suggestions--hidden')).toBe(true);
    });
    it('to be visible', () => {
      wrapper.setProps({
        query: 'query',
        results: [
          { title: 'a', type: 'term' },
          { title: 'b', type: 'term' }
        ]
      });
      expect(wrapper.hasClass('dc-search-suggestions--hidden')).toBe(false);
    });
  });

  describe('Suggestions list', () => {
    it('does not render a list of suggestions if no results', () => {
      wrapper.setProps({ results: [] });
      expect(wrapper.find('.dc-search-suggestions__suggestion').length).toBe(0);
    });
    it('renders a list of suggestions if results', () => {
      wrapper.setProps({
        results: [
          { title: 'some title', type: 'autocomplete', price: '22.2' },
          { title: 'some title', type: 'sayt', price: '13.5' }
        ]
      });
      expect(wrapper.find('.dc-search-suggestions__suggestion').length).toBe(2);
    });
  });
});
