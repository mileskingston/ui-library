import React from 'react';
import { shallow } from 'enzyme';
import { Settings, DateTime } from 'luxon';
import regionalSettings from '../../config/regionalSettings';
import OpeningHours from './OpeningHours';

Settings.defaultLocale = regionalSettings.locale;

// Wed Feb 01 2017 10:00:00 UTC
const currentDate = DateTime.fromObject({
  year: 2017,
  month: 10,
  day: 13,
  hour: 10,
  minute: 0,
  zone: regionalSettings.timeZone
});

const openingHours = [
  { date: '2017-10-13', from: '09:00', to: '21:00' },
  {
    date: '2017-10-14', from: '09:00', to: '21:00', label: 'Bank holidays'
  },
  { date: '2017-10-15', from: '09:00', to: '21:00' },
  { date: '2017-10-16', from: '00:00', to: '00:00' },
  {
    date: '2017-10-17', from: '00:00', to: '00:00', label: 'Bank holidays'
  },
  { date: '2017-10-18', from: '09:00', to: '18:00' },
  { date: '2017-10-19', from: '09:00', to: '21:00' }
];

const openingHoursSingleDay = [
  {
    date: '2017-10-13', from: '09:00', to: '21:00', label: 'Bank holidays'
  }
];

const headerText = 'Test text';

const wrapper = shallow(
  <OpeningHours
    currentDate={currentDate}
    openingHours={openingHours}
    headerText={headerText}
  />
);

const wrapperWithoutAddress = shallow(
  <OpeningHours
    currentDate={currentDate}
    openingHours={openingHours}
  />
);

describe('Opening hours', () => {
  it('has displayName property set', () => {
    expect(OpeningHours.displayName).toBe('OpeningHours');
  });

  it('renders component', () => {
    expect(wrapper.hasClass('dc-opening-hours')).toBe(true);
  });

  it('renders table', () => {
    expect(wrapper.find('.dc-opening-hours__table').length).toBe(1);
  });

  it('renders table rows', () => {
    expect(wrapper.find('.dc-opening-hours__table tr').length).toBe(8);
  });

  it('renders table cells', () => {
    expect(wrapper.find('.dc-opening-hours__table td').length).toBe(21);
  });

  it('has long date', () => {
    expect(
      wrapper
        .find('.dc-opening-hours__table tr .dc-opening-hours__date-long')
        .first().length
    ).toBe(1);
  });

  it('has short date', () => {
    expect(
      wrapper
        .find('.dc-opening-hours__table tr .dc-opening-hours__date-short')
        .first().length
    ).toBe(1);
  });

  it('has opening time', () => {
    expect(
      wrapper
        .find('.dc-opening-hours__table tr').at(1)
        .find('.dc-opening-hours__opening-time__text').text()
    ).toEqual('09:00 – 21:00');
  });

  it('has label', () => {
    expect(
      wrapper
        .find('.dc-opening-hours__table tr').at(2)
        .find('.dc-opening-hours__date-long').text()
    ).toEqual('Bank holidays');
  });

  it('displays the address', () => {
    expect(wrapper.find('.dc-opening-hours__store-address').length).toEqual(1);
  });

  it('must not display the address if null/undefined', () => {
    expect(wrapperWithoutAddress.find('.dc-opening-hours__store-address').length).toEqual(0);
  });


  describe('render OpeningHours when first opening day is today', () => {
    it('table has state-open className', () => {
      expect(
        wrapper
          .find('table')
          .hasClass('state-open')
      ).toBe(true);
    });

    it('has tooltip with correct text', () => {
      expect(
        wrapper
          .find('.dc-opening-hours__opening-tooltip').text()
      ).toBe('Open now');
    });

    it('has long date formatted correctly', () => {
      expect(
        wrapper
          .find('.dc-opening-hours__first-day').first()
          .find('.dc-opening-hours__date-long').text()
      ).toBe('Friday, 13th Oct');
    });

    it('has short date formatted correctly', () => {
      expect(
        wrapper
          .find('.dc-opening-hours__first-day').first()
          .find('.dc-opening-hours__date-short').text()
      ).toBe('Fri, 13th Oct');
    });
  });

  describe('render OpeningHours when first opening day is not today', () => {
    const openingHoursNotToday = [
      { date: '2017-10-12', from: '09:00', to: '21:00' },
      {
        date: '2017-10-14', from: '09:00', to: '21:00', label: 'Bank holidays'
      },
      { date: '2017-10-15', from: '09:00', to: '21:00' },
      { date: '2017-10-16', from: '00:00', to: '00:00' },
      {
        date: '2017-10-17', from: '00:00', to: '00:00', label: 'Bank holidays'
      },
      { date: '2017-10-18', from: '09:00', to: '18:00' },
      { date: '2017-10-19', from: '09:00', to: '21:00' }
    ];

    const wrapperNotToday = shallow(
      <OpeningHours
        currentDate={currentDate}
        openingHours={openingHoursNotToday}
      />
    );

    it('has no tooltip', () => {
      expect(
        wrapperNotToday
          .find('.dc-opening-hours__opening-tooltip').length
      ).toBe(0);
    });

    it('table has state-default className', () => {
      expect(
        wrapperNotToday
          .find('table')
          .hasClass('state-default')
      ).toBe(true);
    });

    it('has long date formatted correctly', () => {
      expect(
        wrapperNotToday
          .find('.dc-opening-hours__first-day').first()
          .find('.dc-opening-hours__date-long').text()
      ).toBe('Thursday, 12th Oct');
    });

    it('has short date formatted correctly', () => {
      expect(
        wrapperNotToday
          .find('.dc-opening-hours__first-day').first()
          .find('.dc-opening-hours__date-short').text()
      ).toBe('Thu, 12th Oct');
    });
  });

  describe('render OpeningHours with cuttoffTime set to true', () => {
    const withCuttOffTimeDate = DateTime.fromObject({
      year: 2017,
      month: 10,
      day: 13,
      hour: 8,
      minute: 55,
      zone: regionalSettings.timeZone
    });

    const withCuttOffTimeWrapper = shallow(
      <OpeningHours
        currentDate={withCuttOffTimeDate}
        openingHours={openingHoursSingleDay}
      />
    );

    it('will render cuttOffTime tooltip', () => {
      expect(
        withCuttOffTimeWrapper
          .find('.dc-opening-hours__opening-tooltip').length
      ).toBe(1);
    });
  });

  describe('render OpeningHours with showCuttOffTime set to false', () => {
    const withoutCuttOffTimeDate = DateTime.fromObject({
      year: 2017,
      month: 10,
      day: 13,
      hour: 8,
      minute: 55,
      zone: regionalSettings.timeZone
    });
    
    const withoutCuttOffTimeWrapper = shallow(
      <OpeningHours
        currentDate={withoutCuttOffTimeDate}
        openingHours={openingHoursSingleDay}
        showCuttOffTime={false}
      />
    );

    it('will not render cuttOffTime tooltip', () => {
      expect(
        withoutCuttOffTimeWrapper
          .find('.dc-opening-hours__opening-tooltip').length
      ).toBe(0);
    });
  });
});
