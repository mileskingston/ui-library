import React from 'react';
import { mount } from 'enzyme';

import SortBy from './SortBy';

const options = [
  {
    id: 0,
    value: '',
    selected: true,
    labe: 'Please select',
    disabled: true
  },
  {
    id: 1,
    value: '#Relevance',
    selected: false,
    label: 'welcome'
  },
  {
    id: 3,
    value: '#BrandAtoZ',
    selected: false,
    label: 'Brand - A to Z'
  },
  {
    id: 4,
    value: '#BrandZtoA',
    selected: false,
    label: 'Brand - Z to A'
  }
];

const title = 'Sort By:';

const wrapper = mount(
  <SortBy options={options} title={title} formId="sortBy" />
);

describe('SortBy', () => {
  it('renders sort by wrapper', () => {
    expect(wrapper.find('.dc-sort-by').length).toBe(1);
  });

  it('renders sort by title', () => {
    expect(wrapper.find('.dc-sort-by-label').text()).toBe('Sort By:');
  });

  it('renders Select component', () => {
    expect(wrapper.find('.dc-select').length).toBe(1);
  });
});
