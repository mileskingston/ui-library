import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';
import Icon from '../../molecules/Icon/Icon';
import { H3 } from '../../molecules/Heading/Heading';
import regionalSettings from '../../config/regionalSettings';
import OpeningHours from '../../organisms/OpeningHours/OpeningHours';
import './LocationListItem.styl';

/**
 * @deprecated this component will be removed in version 4.0.0
 */
class LocationListItem extends Component {
  constructor(props) {
    super(props);
    this.handleClickLocationItem = this.handleClickLocationItem.bind(this);
    this.handleEnterLocationItem = this.handleEnterLocationItem.bind(this);
    this.handleLeaveLocationItem = this.handleLeaveLocationItem.bind(this);
  }

  handleClickLocationItem(e) {
    e.preventDefault();
    this.props.clickLocationItem(this.props.location);
  }

  handleEnterLocationItem(e) {
    e.preventDefault();
    this.props.enterLocationItem(this.props.location);
  }

  handleLeaveLocationItem(e) {
    e.preventDefault();
    this.props.leaveLocationItem(this.props.location);
  }

  render() {
    const { distance } = this.props.location;
    const distanceUnit = distance.unit === 'M'
      ? `${distance.value === 1 ? 'mile' : 'miles'} away`
      : distance.unit;

    const classes = [
      'dc-location-list-item'
    ];

    if (this.props.mobileVisible) {
      classes.push('dc-location-list-item__mobileVisible');
    }

    if (this.props.index === 0) {
      classes.push('dc-location-list-item__closest');
    }

    return (
      <li className={classes.join(' ')}>
        {this.props.index !== 'undefined' &&
          (typeof this.props.storeTitles[this.props.index] !== 'undefined') &&
            <span
              className="dc-location-list-item__title"
            >
              {this.props.storeTitles[this.props.index]}
            </span>
        }
        <a
          className={`dc-location-list-item__content ${this.props.isActive
            ? 'dc-location-list-item__is-active'
            : ''
          }`}
          onClick={this.handleClickLocationItem}
          onMouseEnter={this.handleEnterLocationItem}
          onMouseLeave={this.handleLeaveLocationItem}
        >
          <Icon icon="LocationPin" />
          <div className="dc-location-list-item__text">
            <H3>{this.props.location.name}</H3>
            <span
              className="dc-location-list-item__address"
            >{this.props.location.address}
            </span>
            <span
              className="dc-location-list-item__description"
            >{this.props.location.description}
            </span>
            <span
              className="dc-location-list-item__distance"
            >{
              typeof this.props.location.distanceLabel !== 'undefined'
                ? this.props.location.distanceLabel
                : `${distance.value} ${distanceUnit}`
            }
            </span>
            <div className="dc-location-list-item__opening-hours">
              {this.props.openingHours &&
                <OpeningHours
                  currentDate={this.props.currentDate}
                  openingHours={this.props.openingHours}
                  timeZone={this.props.timeZone}
                  translations={this.props.translations}
                />
              }
            </div>
          </div>
          <Icon icon="ChevronRight" />
        </a>
      </li>
    );
  }
}

LocationListItem.propTypes = {
  index: PropTypes.number.isRequired,
  location: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    description: PropTypes.string,
    distance: PropTypes.shape({
      value: PropTypes.number,
      unit: PropTypes.string
    }),
    distanceLabel: PropTypes.string
  }).isRequired,
  mobileVisible: PropTypes.bool,
  setActiveMarker: PropTypes.func,
  clickLocationItem: PropTypes.func,
  enterLocationItem: PropTypes.func,
  leaveLocationItem: PropTypes.func,
  storeTitles: PropTypes.arrayOf(PropTypes.string),
  isActive: PropTypes.bool,
  currentDate: PropTypes.objectOf(Date),
  openingHours: PropTypes.arrayOf(PropTypes.shape({
    from: PropTypes.string,
    to: PropTypes.string,
    date: PropTypes.string
  })).isRequired,
  timeZone: PropTypes.string,
  translations: PropTypes.shape({
    openingHours: PropTypes.string,
    labelClosed: PropTypes.string,
    openingSoon: PropTypes.string,
    openingLessThen: PropTypes.string,
    closingSoon: PropTypes.string,
    closingLessThen: PropTypes.string,
    mins: PropTypes.string,
    openNow: PropTypes.string
  })
};

LocationListItem.defaultProps = {
  mobileVisible: false,
  clickLocationItem: () => {},
  enterLocationItem: () => {},
  leaveLocationItem: () => {},
  translations: {
    openingHours: 'Opening hours',
    labelClosed: 'Closed',
    openingSoon: 'Opening soon',
    openingLessThen: 'Opening less then',
    closingSoon: 'Closing soon',
    closingLessThen: 'Closing less then',
    mins: 'mins',
    openNow: 'Open'
  },
  setActiveMarker: () => {},
  storeTitles: [],
  isActive: false,
  currentDate: DateTime.fromObject({ zone: regionalSettings.timeZone }),
  timeZone: regionalSettings.timeZone
};

export default LocationListItem;
