import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';
import regionalSettings from '../../config/regionalSettings';
import LocationListItem from '../../molecules/LocationListItem/LocationListItem';
import Button from '../../molecules/Button/Button';
import './LocationList.styl';

/**
 * @deprecated this component will be removed in version 4.0.0
 */
class LocationList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mobileShowAll: false
    };
  }

  toggleFullListMobile() {
    this.setState({
      mobileShowAll: !this.state.mobileShowAll
    });
  }

  render() {
    const LocationListItems = this.props.locations.map((location, index) => {
      const visible = index < this.props.mobileDefaultStoresVisible;
      return (<LocationListItem
        key={index}
        index={index}
        mobileVisible={visible}
        location={location}
        currentDate={this.props.currentDate}
        openingHours={location.openingHours}
        timeZone={this.props.timeZone}
        isActive={
          this.props.activeItemId === location.id ||
          this.props.selectedItemId === location.id
        }
        storeTitles={this.props.storeTitles}
        clickLocationItem={this.props.clickLocationItem}
        enterLocationItem={this.props.enterLocationItem}
        leaveLocationItem={this.props.leaveLocationItem}
      />);
    });

    // eslint-disable-next-line react/jsx-no-bind
    const toggleFullListMobile = this.toggleFullListMobile.bind(this);

    return (
      <div
        className={`dc-location-list ${this.state.mobileShowAll ? 'dc-location-list__expand' : ''}`}
      >
        <ul>
          {LocationListItems}
        </ul>

        <div className="dc-location-list__button">
          <Button
            onClick={toggleFullListMobile} // eslint-disable-line react/jsx-no-bind
          >
            {this.state.mobileShowAll
              ? this.props.mobileButtonLabels.less
              : this.props.mobileButtonLabels.more
            }
          </Button>
        </div>
      </div>
    );
  }
}

LocationList.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.object),
  clickLocationItem: PropTypes.func,
  enterLocationItem: PropTypes.func,
  leaveLocationItem: PropTypes.func,
  mobileButtonLabels: PropTypes.objectOf(PropTypes.string),
  storeTitles: PropTypes.arrayOf(PropTypes.string),
  mobileDefaultStoresVisible: PropTypes.number,
  activeItemId: PropTypes.number,
  selectedItemId: PropTypes.number,
  timeZone: PropTypes.string,
  currentDate: PropTypes.objectOf(DateTime)
};

LocationList.defaultProps = {
  locations: [],
  clickLocationItem: () => {
  },
  enterLocationItem: () => {
  },
  leaveLocationItem: () => {
  },
  mobileButtonLabels: {
    less: 'See less stores',
    more: 'See more stores'
  },
  storeTitles: [
    'Your nearest store',
    'Stores nearby'
  ],
  mobileDefaultStoresVisible: 3,
  activeItemId: null,
  selectedItemId: null,
  timeZone: 'Europe/London',
  currentDate: DateTime.fromObject({ zone: regionalSettings.timeZone })
};

export default LocationList;
