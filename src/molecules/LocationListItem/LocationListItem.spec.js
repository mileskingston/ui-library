import React from 'react';
import { mount } from 'enzyme';
import { DateTime } from 'luxon';
import regionalSettings from '../../config/regionalSettings';

import LocationListItem from './LocationListItem';

const currentDate = DateTime.fromObject({ zone: regionalSettings.timeZone });
const openingHours = [
  { date: getDay(0), from: '09:00', to: '21:00' }
];

function getDay(index) {
  return DateTime
    .fromObject({ zone: regionalSettings.timeZone })
    .plus({ days: index })
    .toFormat('yyyy-MM-dd');
}

const storeTitles = [
  'Your nearest store',
  'Stores nearby'
];

const location =
  {
    id: 123,
    lat: 52.919946,
    lng: -1.505106,
    boxContent: '<h3>Currys PC World featuring Carphone Warehouse Derby</h3>' +
      '<p>Unit A Meteor Centre, Wheatcroft Way <br> Derby, DE21 4RY</p>',
    name: 'Currys PC World featuring Carphone Warehouse Derby',
    address: 'The Light shopping center, Leeds, LS2 5RF',
    distance: {
      value: 1.6,
      unit: 'M'
    },
    distanceLabel: '1.6 miles away',
    openingHours: '<table><tr><td>table with opening hours</td></tr></table>',
    facilities: 'some facilities'
  };
const wrapper = mount(
  <LocationListItem
    location={location}
    index={0}
    storeTitles={storeTitles}
    currentDate={currentDate}
    openingHours={openingHours}
    timeZone={regionalSettings.timeZone}
  />
);

describe('Location list item, ', () => {
  it('is rendered', () => {
    expect(wrapper.find('li').hasClass('dc-location-list-item')).toBe(true);
  });

  it('renders the location name', () => {
    expect(wrapper.find('h3').length).toBeGreaterThanOrEqual(1);
  });

  it('renders the location icons', () => {
    expect(wrapper.find('svg').length).toBe(2);
  });

  it('if is first render closest class', () => {
    expect(wrapper.find('li').hasClass('dc-location-list-item__closest')).toBe(true);
  });

  it('if is first renders title element', () => {
    expect(wrapper.find('.dc-location-list-item__title').length).toBeGreaterThanOrEqual(1);
  });

  it('it has opening hours', () => {
    expect(wrapper.find('.dc-opening-hours').length).toBe(1);
  });
});
