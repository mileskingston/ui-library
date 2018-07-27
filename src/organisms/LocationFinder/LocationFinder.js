/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../molecules/Button/Button';
import Search from '../Search/Search';

import './LocationFinder.styl';

/**
 * @deprecated this component will be removed in version 4.0.0
 */
class LocationFinder extends React.Component {
  constructor(props) {
    super(props);

    this.clearSearch = this.clearSearch.bind(this);
    this.onSearchBlur = this.onSearchBlur.bind(this);
    this.onSearchFocus = this.onSearchFocus.bind(this);

    this.state = {
      desktopGeoLocationEnabled: props.geoLocationEnabled,
      searchFocus: false
    };
  }

  componentDidMount() {
    this.props.loadLocationFinder();

    if (this.props.geoLocationEnabled) {
      this.requestGeolocationPermission();
    }
  }

  onSearchBlur() {
    this.setState({
      searchFocus: false
    });

    this.props.onSearchFocusChanged(false);
  }

  onSearchFocus() {
    this.setState({
      searchFocus: true
    });

    this.props.onSearchFocusChanged(true);
  }

  requestGeolocationPermission() {
    if ('geolocation' in navigator) {
      if (this.props.askUserForGeolocateOnMount) {
        navigator.geolocation.getCurrentPosition(
          () => {
            this.setState({
              desktopGeoLocationEnabled: true
            });
          },
          () => {
            this.setState({
              desktopGeoLocationEnabled: false
            });
          }
        );
      }
    } else {
      this.setState({
        desktopGeoLocationEnabled: false
      });
    }
  }

  clearSearch() {
    this.setState({
      searchFocus: true
    });

    this.props.clearLocation();
  }

  render() {
    const { props, state } = this;

    const displayGeoLocationButton = state.searchFocus &&
      !props.processing &&
      !props.location.searchText.length &&
      state.desktopGeoLocationEnabled;

    return (
      <div data-component="LocationFinder" className="dc-location-finder">
        <Search
          ref={props.searchRef}
          activeItemIndex={props.location.activeItemIndex}
          ariaLabel="Location finder"
          classes="dc-location-finder-search"
          clearSearch={this.clearSearch}
          error={props.location.error}
          inputRenderer={props.inputRenderer}
          onBlur={this.onSearchBlur}
          onChange={props.onSearchTextChange}
          onFocus={this.onSearchFocus}
          onSelection={props.onLocationSelection}
          placeholder={props.translations.locationPlaceholder}
          prefill={props.location.prefill}
          processing={props.processing}
          searchHistory={props.location.searchHistory}
          searchHistoryLabel={props.translations.searchHistoryLabel}
          searchIcon={props.location.searchIcon}
          searchItems={props.location.searchItems}
          searchText={props.location.searchText}
          setActiveItem={props.setActiveLocationItem}
          submitDisabled={props.submitDisabled}
        />

        {props.location.error && props.location.errorMessage &&
          <p className="dc-location-finder-error">{props.location.errorMessage}</p>
        }

        {displayGeoLocationButton &&
          <Button
            classes="dc-geolocation-button"
            icon="Target"
            onClick={props.geolocate}
          >
            {props.translations.currentLocationLabel}
          </Button>
        }
      </div>
    );
  }
}

LocationFinder.propTypes = {
  clearLocation: PropTypes.func.isRequired,
  error: PropTypes.object,
  errorMessage: PropTypes.string,
  geolocate: PropTypes.func,
  geoLocationEnabled: PropTypes.bool,
  askUserForGeolocateOnMount: PropTypes.bool,
  inputRenderer: PropTypes.func,
  processing: PropTypes.bool.isRequired,
  loadLocationFinder: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  locationSet: PropTypes.bool.isRequired,
  onSearchFocusChanged: PropTypes.func,
  onSearchTextChange: PropTypes.func.isRequired,
  onLocationSelection: PropTypes.func.isRequired,
  setActiveLocationItem: PropTypes.func.isRequired,
  submitDisabled: PropTypes.bool,
  translations: PropTypes.shape({
    currentLocationLabel: PropTypes.string,
    locationPlaceholder: PropTypes.string,
    searchHistoryLabel: PropTypes.string
  }),
  searchRef: PropTypes.func
};

LocationFinder.defaultProps = {
  error: null,
  errorMessage: null,
  geolocate: () => {},
  geoLocationEnabled: false,
  askUserForGeolocateOnMount: true,
  inputRenderer: undefined,
  submitDisabled: false,
  translations: {
    currentLocationLabel: 'Use my current location',
    locationPlaceholder: 'Enter town or postcode',
    searchHistoryLabel: 'Previous searches'
  },
  onSearchFocusChanged: () => {},
  searchRef: () => {}
};

LocationFinder.displayName = 'LocationFinder';

export default LocationFinder;
