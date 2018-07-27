import React from 'react';
import { shallow } from 'enzyme';
import HeaderSearch from './HeaderSearch';
import SearchFieldset from './SearchFieldset/SearchFieldset';
import SearchSuggestions from './SearchSuggestions/SearchSuggestions';

const setup = (props) => {
  const wrapper = shallow(<HeaderSearch {...props} />);
  return {
    props,
    wrapper
  };
};

let wrapper = null;

describe('HeaderSearch', () => {
  beforeAll(() => {
    wrapper = setup({
      clearResults: () => { },
      displaySearch: false,
      error: null,
      isFetching: false,
      loadAutocomplete: () => { },
      loadSayt: () => { },
      query: '',
      results: [],
      updateQuery: () => {
      },
      searchAction: ''
    }).wrapper;
  });

  afterAll(() => {
    wrapper = null;
  });

  it('has displayName property set', () => {
    expect(HeaderSearch.displayName).toBe('HeaderSearch');
  });

  it('renders the SearchFieldset component', () => {
    expect(wrapper.find(SearchFieldset).length).toBe(1);
  });

  it('renders the SearchSuggestions component', () => {
    expect(wrapper.find(SearchSuggestions).length).toBe(1);
  });
});
