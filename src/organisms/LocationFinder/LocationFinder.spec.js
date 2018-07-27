/* global describe, it */
import React from 'react';
import { mount } from 'enzyme';

import LocationFinder from './LocationFinder';

let wrapper;

const defaultProps = {
  canGeolocate: jest.fn(),
  clearLocation: jest.fn(),
  desktopGeolocationEnabled: true,
  error: null,
  geolocate: jest.fn(),
  processing: false,
  loadLocationFinder: jest.fn(),
  location: {
    activeItemIndex: -1,
    prefill: 0,
    searchHistory: [],
    searchIcon: true,
    searchItems: [],
    searchText: ''
  },
  locationSet: false,
  onSearchTextChange: jest.fn(),
  onLocationSelection: jest.fn(),
  setActiveLocationItem: jest.fn()
};

const setup = (props = defaultProps) => mount(
  <LocationFinder {...props} />
);

describe('LocationFinder component', () => {

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }

    jest.restoreAllMocks();
  });

  it('should have a display name set', () => {
    expect(LocationFinder.displayName).toBe('LocationFinder');
  });

  describe('componentDidMount()', () => {
    it('should initialise location finder', () => {
      wrapper = setup();
      expect(defaultProps.loadLocationFinder).toHaveBeenCalled();
    });
  });

  describe('onSearchBlur()', () => {
    it('should update searchFocus state to false', () => {
      wrapper = setup();
      wrapper.setState({ searchFocus: true });
      wrapper.instance().onSearchBlur();
      expect(wrapper.state('searchFocus')).toBe(false);
    });
  });

  describe('onSearchFocus()', () => {
    it('should set searchFocus state to true', () => {
      wrapper = setup();
      wrapper.setState({ searchFocus: false });
      wrapper.instance().onSearchFocus();
      expect(wrapper.state('searchFocus')).toBe(true);
    });
  });

  describe('render()', () => {
    it('should render Search component', () => {
      wrapper = setup();
      expect(wrapper.find('[data-component="Search"]').length).toEqual(1);
    });

    it('should check if geolocation is permitted', () => {
      const props = Object.assign({}, defaultProps, {
        geoLocationEnabled: true,
        processing: false
      });

      wrapper = setup(props);
      wrapper.setState({ searchFocus: true });
    });

    it('should display geolocation button if requirements are met', () => {
      global.navigator.geolocation = {};
      global.navigator.geolocation.getCurrentPosition = () => true;

      const props = Object.assign({}, defaultProps, {
        geoLocationEnabled: true,
        processing: false
      });

      wrapper = setup(props);
      wrapper.setState({ searchFocus: true });

      expect(wrapper.find('.dc-geolocation-button').length).toEqual(1);
    });

    it('should not display geolocation button if search input is not in focus', () => {
      const props = Object.assign({}, defaultProps, {
        desktopGeoLocationEnabled: true,
        canGeolocate: () => true,
        processing: false
      });

      wrapper = setup(props);
      wrapper.setState({ searchFocus: false });

      expect(wrapper.find('.dc-geolocation-button').length).toEqual(0);
    });

    it('should not display geolocation button if geolocation is not enabled', () => {
      const props = Object.assign({}, defaultProps, {
        geoLocationEnabled: false,
        processing: false
      });

      wrapper = setup(props);
      wrapper.setState({ searchFocus: true });

      expect(wrapper.find('.dc-geolocation-button').length).toEqual(0);
    });
  });
});
