import { DateTime } from 'luxon';
import regionalSettings from '../config/regionalSettings';
import StoreAvailability from './storeAvailability';

const currentDate = DateTime.fromObject({
  year: 2017,
  month: 10,
  day: 13,
  hour: 10,
  minute: 0,
  second: 0,
  zone: regionalSettings.timeZone
}); // 10:00

const dateUntillClosed = DateTime.fromObject({
  year: 2017,
  month: 10,
  day: 13,
  hour: 20,
  minute: 50,
  second: 0,
  zone: regionalSettings.timeZone
}); // 20:50

const dateUntillOpen = DateTime.fromObject({
  year: 2017,
  month: 10,
  day: 13,
  hour: 8,
  minute: 50,
  second: 0,
  zone: regionalSettings.timeZone
}); // 8:50

const newDate = DateTime.fromObject({
  year: 2017,
  month: 10,
  day: 13,
  hour: 11,
  minute: 0,
  second: 0,
  zone: regionalSettings.timeZone
}); // 11:00

const cuttOffTime = [30, 20, 10, 5];
const openingHours = [
  { date: '2017-10-13', from: '09:00', to: '21:00' },
  { date: '2017-10-14', from: '09:00', to: '21:00' },
  { date: '2017-10-15', from: '09:00', to: '21:00' },
  { date: '2017-10-16', from: '00:00', to: '00:00' },
  {
    date: '2017-10-17', from: '00:00', to: '00:00', label: 'Bank holidays'
  },
  { date: '2017-10-18', from: '09:00', to: '18:00' },
  { date: '2017-10-19', from: '09:00', to: '21:00' }
];

describe('storeavailability', () => {
  let storeavailability = null;

  beforeEach(() => {
    storeavailability = new StoreAvailability({
      currentDate: currentDate,
      openingHours: openingHours,
      cuttOffTime: cuttOffTime,
      timeZone: regionalSettings.timeZone
    });
  });

  it('creates instance', () => {
    expect(storeavailability instanceof StoreAvailability).toBe(true);
  });

  it('changes date', () => {
    expect(storeavailability.currentDate).toBe(currentDate);

    storeavailability.updateCurrentDate(newDate);

    expect(storeavailability.currentDate).toBe(newDate);
  });

  it('returns current day', () => {
    expect(storeavailability.getCurrentDate()).toBe(currentDate);
  });

  it('returns opening hours', () => {
    expect(storeavailability.getStoreOpeningHours()).toEqual(openingHours);
  });

  it('returns open state', () => {
    expect(storeavailability.getOpenState()).toBe('OPEN');
  });

  it('returns time untill opened', () => {
    storeavailability.updateCurrentDate(dateUntillOpen);
    expect(storeavailability.getTimeUntilOpen()).toBe(10);
  });

  it('returns time untill closed', () => {
    storeavailability.updateCurrentDate(dateUntillClosed);
    expect(storeavailability.getTimeUntilClosed()).toBe(10);
  });

  it('returns true if opened', () => {
    storeavailability.updateCurrentDate(newDate);
    expect(storeavailability.isOpen()).toBe(true);
  });
});
