/**
 * @deprecated dateHelpers will be removed in version 4.0.0
 */

export const WEEKDAY_SHORT = 'weekdayShort';
export const WEEKDAY_LONG = 'weekdayLong';

/**
 * Returns ordinary indicator
 * @param {number} day day
 * @returns {string} Returns ordinary indicator
 */
export const getOrdinaryIndicator = (day) => {
  if (typeof day !== 'number') {
    return '';
  }

  const j = day % 10;
  const k = day % 100;
  if (j === 1 && k !== 11) {
    return 'st';
  }
  if (j === 2 && k !== 12) {
    return 'nd';
  }
  if (j === 3 && k !== 13) {
    return 'rd';
  }

  return 'th';
};

/**
 * Transform date to either to long or short
 * @param {DateTime} currentDate current date got from new Date()
 * @param {boolean} long determinates if function returns short or long name of the day
 * @returns {string} Returns day formatted in "dddd" "d" "mmm " (Wednesday, 11th Oct)
 */
export const formatDate = (date, weekdayType) => {
  const { day, monthShort } = date;
  const weekday = weekdayType === WEEKDAY_LONG ? date.weekdayLong : date.weekdayShort;
  const ord = getOrdinaryIndicator(day);

  return `${weekday}, ${day}${ord} ${monthShort}`;
};

/**
 * Transform dates ('05:40' || '5:9' || '5:05') to minutes from midnight (start of the day)
 * @param {string} date date must be in hh:mm formate
 * @returns {number} minutes from midnight
 */
export const fromDateToMminutesFromMidnight = (date) => {
  const separator = ':';
  const re = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9])$/;

  if (!date.match(re)) {
    return 0;
  }

  return (
    (parseInt(date.split(separator)[0], 10) * 60) + // hours
    parseInt(date.split(separator)[1], 10) // minutes
  );
};

/**
 * Formats luxon DateTime object to human readable format with long day form
 * @param {DateTime} date
 * @returns {string}
 */
export const longDate = date => formatDate(date, WEEKDAY_LONG);
/**
 * Formats luxon DateTime object to human readable format with short day form
 * @param {DateTime} date
 * @returns {string}
 */
export const shortDate = date => formatDate(date, WEEKDAY_SHORT);

/**
 * Prepends time string by extra 0 where needed
 * @param {String} timeString - Time string in either HH:mm or H:mm format
 * @returns {String} Time string in HH:mm format
 */
export const padTime = timeString => timeString.padStart(5, '0');
