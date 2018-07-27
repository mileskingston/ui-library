import { DateTime } from 'luxon';
import regionalSettings from '../config/regionalSettings';
import * as dateHelpers from './dateHelpers';

// Friday, 13 october 2017, 8:00 UTC
let date = DateTime.fromObject({
  year: 2017,
  month: 10,
  day: 13,
  hour: 8,
  zone: regionalSettings.timeZone,
  locale: 'en-GB'
});

describe('date helpers', () => {
  beforeEach(() => {
    date = DateTime.fromObject({
      year: 2017,
      month: 10,
      day: 13,
      hour: 8,
      zone: regionalSettings.timeZone,
      locale: 'en-GB'
    });
  });

  describe('fromDateToMminutesFromMidnight', () => {
    it('returns minutes when correct data are passed', () => {
      expect(
        dateHelpers.fromDateToMminutesFromMidnight('09:00')
      ).toBe(540);
    });

    it('returns 0 when incorrect data are passed', () => {
      expect(
        dateHelpers.fromDateToMminutesFromMidnight('090:00')
      ).toBe(0);
    });
  });

  describe('longDate', () => {
    it('returns long date without offset', () => {
      expect(
        dateHelpers.longDate(date)
      ).toBe('Friday, 13th Oct');
    });
  });

  describe('shortDate', () => {
    it('returns short date without offset', () => {
      expect(
        dateHelpers.shortDate(date)
      ).toBe('Fri, 13th Oct');
    });
  });

  describe('getOrdinaryIndicator', () => {
    it('returns st', () => {
      expect(
        dateHelpers.getOrdinaryIndicator(1)
      ).toBe('st');
    });

    it('returns nd', () => {
      expect(
        dateHelpers.getOrdinaryIndicator(2)
      ).toBe('nd');
    });

    it('returns rd', () => {
      expect(
        dateHelpers.getOrdinaryIndicator(3)
      ).toBe('rd');
    });

    it('returns th', () => {
      expect(
        dateHelpers.getOrdinaryIndicator(4)
      ).toBe('th');
    });

    it('returns empty string', () => {
      expect(
        dateHelpers.getOrdinaryIndicator('first')
      ).toBe('');
    });
  });

  describe('formatDate', () => {
    it('returns long date', () => {
      expect(
        dateHelpers.formatDate(date, dateHelpers.WEEKDAY_LONG)
      ).toBe('Friday, 13th Oct');
    });

    it('returns short date', () => {
      expect(
        dateHelpers.formatDate(date, dateHelpers.WEEKDAY_SHORT)
      ).toEqual('Fri, 13th Oct');
    });
  });

});
