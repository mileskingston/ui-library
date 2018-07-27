/* global describe, it, afterEach, beforeEach */
import React from 'react';
import { DateTime } from 'luxon';
import { mount } from 'enzyme';

import regionalSettings from '../../config/regionalSettings';
import LocationList from './LocationList';

const currentDate = DateTime.fromObject({ zone: regionalSettings.timeZone });

function getDay(index) {
  return DateTime
    .fromObject({ zone: regionalSettings.timeZone })
    .plus({ days: index })
    .toFormat('yyyy-MM-dd');
}

const mobileButtonLabels = {
  more: 'See more stores',
  less: 'See less stores'
};

const storeTitles = [
  'Your nearest store',
  'Stores nearby'
];

const locations = [
  {
    id: 123,
    lat: 52.919946,
    lng: -1.505106,
    boxContent: '<h3>Currys PC World featuring Carphone Warehouse Derby</h3>' +
      '<p>Unit A Meteor Centre, Wheatcroft Way <br> Derby, DE21 4RY</p>',
    name: 'Currys PC World featuring Carphone Warehouse Derby',
    adress: 'The Light shopping center, Leeds, LS2 5RF',
    distance: {
      value: 1.6,
      unit: 'M'
    },
    distanceLabel: '1.6 miles away',
    openingHours: [{ date: getDay(0), from: '09:00', to: '21:00' }],
    facilities: 'some facilities'
  }
];

const wrapper = mount(
  <LocationList
    locations={locations}
    mobileButtonLabels={mobileButtonLabels}
    storeTitles={storeTitles}
    currentDate={currentDate}
    timeZone={regionalSettings.timeZone}
  />
);

describe('Location list, ', () => {
  it('container is rendered', () => {
    expect(wrapper.find('div').first().hasClass('dc-location-list')).toBe(true);
  });

  it('renders the location item(s)', () => {
    expect(wrapper.find('.dc-location-list-item').length).toBeGreaterThanOrEqual(1);
  });
});
