import React from 'react';
import PropTypes from 'prop-types';
import { Settings, DateTime } from 'luxon';
import regionalSettings from '../../config/regionalSettings';
import { dateHelpers, StoreAvailability } from '../../helpers';

import './OpeningHours.styl';

/**
 * @deprecated this component will be removed in version 4.0.0
 */
const defaultTranslations = {
  openingHours: 'Opening hours',
  labelClosed: 'Closed',
  openingSoon: 'Opening soon',
  openingLessThen: 'Opening less then',
  closingSoon: 'Closing soon',
  closingLessThen: 'Closing less then',
  mins: 'mins',
  openNow: 'Open now'
};

class OpeningHours extends React.Component {
  constructor(props) {
    super(props);

    Settings.defaultLocale = regionalSettings.locale;

    this.storeState = '';
    this.openingTooltip = '';

    if (Array.isArray(props.openingHours)) {
      this.isToday = this.isToday();
      this.storeAvailability = this.getStoreAvailability(props);
      this.translations = Object.assign({}, defaultTranslations, props.translations);
    }

    this.renderRows = this.renderRows.bind(this);
    this.printOpeningTime = this.printOpeningTime.bind(this);
    this.getOpeningTooltip = this.getOpeningTooltip.bind(this);
    this.setOpeningTooltip = this.setOpeningTooltip.bind(this);
    this.renderOpeningDayCell = this.renderOpeningDayCell.bind(this);
    this.renderOpeningTimeCell = this.renderOpeningTimeCell.bind(this);
    this.renderOpeningDayTooltipCell = this.renderOpeningDayTooltipCell.bind(this);
  }

  getOpeningTooltip() {
    if (!this.isToday) {
      return '';
    }

    const { storeAvailability } = this;
    const { showCuttOffTime } = this.props;
    const { state } = storeAvailability;

    const openState = storeAvailability.getOpenState();
    const timeUntilClosed = storeAvailability.getTimeUntilClosed();
    const timeUntilOpen = storeAvailability.getTimeUntilOpen();

    let tooltip = '';

    if ((state.OPENING_SOON === openState) && showCuttOffTime) {
      tooltip = this.getChangingSoonMessage(true, timeUntilOpen);
    } else if (state.OPEN === openState) {
      tooltip = this.translations.openNow;
    } else if ((state.CLOSING_SOON === openState) && showCuttOffTime) {
      tooltip = this.getChangingSoonMessage(false, timeUntilClosed);
    } else if (state.CLOSED === openState) {
      tooltip = this.translations.labelClosed;
    }
    return tooltip;
  }

  getChangingSoonMessage(opening, timeUntilOpenOrClosed) {
    const cutoffTime = this.props.cuttOffTime.sort((a, b) => a - b);
    const displayedTime = cutoffTime.filter(
      threshold => timeUntilOpenOrClosed <= threshold
    )[0];

    if (!displayedTime) {
      return this.translations[`${opening ? 'opening' : 'closing'}Soon`];
    }

    return `${this.translations[opening
      ? 'openingLessThen'
      : 'closingLessThen'
    ]} ${displayedTime} ${this.translations.mins}`;
  }

  getStoreAvailability(props) {
    const {
      openingHours, currentDate, cuttOffTime, timeZone
    } = props;

    return new StoreAvailability({
      currentDate,
      openingHours,
      cuttOffTime,
      timeZone
    });
  }

  setStoreState() {
    this.storeState = this.isToday
      ? this.storeAvailability.getOpenState()
      : 'default';
  }

  setOpeningTooltip() {
    this.openingTooltip = this.getOpeningTooltip();
  }

  isToday() {
    // this.props.openingHours[0].date is string
    // this.props.currentDate is DateTime luxon-style
    return this.props.currentDate.toFormat('yyyy-MM-dd') === this.props.openingHours[0].date;
  }

  printOpeningTime(dayOpeningHours, index, hasTooltip) {
    const timeFrom = dayOpeningHours.from.padStart(5, '0');
    const timeTo = dayOpeningHours.to.padStart(5, '0');

    const timeOpened = [
      <span key={`timeFrom-${index}`} className="dc-opening-hours__time-from">{timeFrom}</span>,
      <span
        key={`timeSeparator-${index}`}
        className="dc-opening-hours__time-separator"
      >
        {'\u200a\u2013\u200a'}
      </span>,
      <span key={`timeTo-${index}`} className="dc-opening-hours__time-to">{timeTo}</span>
    ];

    const labelClosed = (
      <span className="dc-opening-hours__label_closed">{this.translations.labelClosed}</span>
    );

    return (
      <span>
        <span className="dc-opening-hours__opening-time__text">
          {
            dayOpeningHours.from === dayOpeningHours.to
              ? labelClosed
              : timeOpened
          }
        </span>
      </span>
    );
  }

  renderHeader(headerText) {
    if (!headerText) {
      return null;
    }

    return (
      <thead>
        <tr>
          <th colSpan="2" className="dc-opening-hours__store-address">
            <div className="dc-opening-hours__store-address-text">{headerText}</div>
          </th>
          <th />
        </tr>
      </thead>
    );
  }

  renderRows(dayOpeningHours, index) {
    return (
      <tr
        className={`${index === 0
          ? 'dc-opening-hours__first-day'
          : 'dc-opening-hours__regular-day'
        }`}
        key={index}
      >
        {this.renderOpeningDayCell(dayOpeningHours)}
        {this.renderOpeningTimeCell(dayOpeningHours, index)}
        {this.renderOpeningDayTooltipCell(dayOpeningHours, index)}
      </tr>
    );
  }

  renderOpeningDayCell(dayOpeningHours) {
    const labelClassName = dayOpeningHours.label ? 'opening-day-label' : '';
    const dayDateTime = DateTime.fromFormat(dayOpeningHours.date, 'yyyy-MM-dd');

    return (
      <td className={`dc-opening-hours__opening-day ${labelClassName}`}>
        <span className="dc-opening-hours__date-long">
          {dayOpeningHours.label || dateHelpers.longDate(dayDateTime)}
        </span>
        <span className="dc-opening-hours__date-short">
          {dayOpeningHours.label || dateHelpers.shortDate(dayDateTime)}
        </span>
      </td>
    );
  }

  renderOpeningTimeCell(dayOpeningHours, index) {
    const hasTooltip = index === 0 && this.openingTooltip;
    return (
      <td className="dc-opening-hours__opening-time">
        {this.printOpeningTime(dayOpeningHours, index, hasTooltip)}
      </td>
    );
  }

  renderOpeningDayTooltipCell(dayOpeningHours, index) {
    const hasTooltip = index === 0 && this.openingTooltip;
    return (
      <td className="dc-opening-hours__opening-state">
        {hasTooltip
          ? (
            <span className="dc-opening-hours__opening-tooltip" data-state-message="">
              {this.openingTooltip}
            </span>
          )
          : <span />
        }
      </td>
    );
  }

  render() {
    const isOpeningHoursArray = Array.isArray(this.props.openingHours);
    if (
      !isOpeningHoursArray ||
      (isOpeningHoursArray && this.props.openingHours.length < 1)
    ) {

      console.warn(`
        Invalid input openingHours:
          Expected an Array with at least one item.
          Item should be an object.
      `);
      return null;
    }

    this.storeAvailability.updateCurrentDate(this.props.currentDate);
    this.setStoreState();
    this.setOpeningTooltip();

    return (
      <div className="dc-opening-hours">
        <table className={`state-${this.storeState.toLowerCase()} dc-opening-hours__table`}>
          {this.renderHeader(this.props.headerText)}
          <tbody>
            {this.props.openingHours.map((dayOpeningHours, index) => (
              this.renderRows(dayOpeningHours, index)
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

OpeningHours.displayName = 'OpeningHours';

OpeningHours.defaultProps = {
  openingHours: [],
  timeZone: 'Europe/London',
  currentDate: DateTime.local().setZone(regionalSettings.timeZone),
  cuttOffTime: [30, 20, 10, 5],
  translations: {},
  showCuttOffTime: true,
  headerText: null
};

OpeningHours.propTypes = {
  openingHours: PropTypes.arrayOf(PropTypes.shape({
    from: PropTypes.string,
    to: PropTypes.string,
    date: PropTypes.string
  })),
  timeZone: PropTypes.string,
  showCuttOffTime: PropTypes.bool,
  cuttOffTime: PropTypes.arrayOf(PropTypes.number),
  translations: PropTypes.shape({
    openingHours: PropTypes.string,
    labelClosed: PropTypes.string,
    openingSoon: PropTypes.string,
    openingLessThen: PropTypes.string,
    closingSoon: PropTypes.string,
    closingLessThen: PropTypes.string,
    mins: PropTypes.string,
    openNow: PropTypes.string
  }),
  currentDate: PropTypes.objectOf(DateTime),
  headerText: PropTypes.string
};

export default OpeningHours;
