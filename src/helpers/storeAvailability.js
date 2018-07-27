import { DateTime } from 'luxon';
import { padTime } from '../helpers/dateHelpers';
import regionalSettings from '../config/regionalSettings';

/**
 * @deprecated storeAvailability will be removed in version 4.0.0
 */
class StoreAvailability {
  constructor({
    currentDate = DateTime.fromObject({ zone: regionalSettings.timeZone }),
    openingHours = [],
    cuttOffTime = [30, 20, 10, 5],
    timeZone = 0
  }) {
    this.currentDate = currentDate;
    this.openingHours = openingHours;
    this.timeZone = timeZone;
    this.THRESHOLD = Math.max.apply(null, cuttOffTime);

    this.state = {
      CLOSED: 'CLOSED',
      OPEN: 'OPEN',
      CLOSING_SOON: 'CLOSING_SOON',
      OPENING_SOON: 'OPENING_SOON',
      NO_DATA: 'NO_DATA'
    };

    this.compute = this.compute.bind(this);

    this.isComputed = false;
    this.availability = null;
    this.checkComputed();
  }

  updateCurrentDate(newDate) {
    this.isComputed = false;
    this.currentDate = newDate;
    this.checkComputed();
  }

  getCurrentDate() {
    return this.currentDate;
  }

  getStoreOpeningHours() {
    return this.openingHours;
  }

  getTimeUntilClosed() {
    this.checkComputed();
    return this.availability.minutesToClose;
  }
  
  getTimeUntilOpen() {
    this.checkComputed();
    return this.availability.minutesToOpen;
  }
  
  getOpenState() {
    this.checkComputed();
    return this.availability.openState;
  }

  isClosingSoon() {
    this.checkComputed();
    return this.availability.isClosingSoon;
  }

  isOpeningSoon() {
    this.checkComputed();
    return this.availability.isOpeningSoon;
  }

  isOpen() {
    this.checkComputed();
    return this.availability.isOpen;
  }
  
  checkComputed() {
    if (this.isComputed === false) {
      this.compute();
    }
  }
  
  /**
   * Computes minutes to open/close of a store based on this.currentDate and opening hours
   * and provided object with from/to opening hours
   *
   * @param {Object} dayOpeningHours
   * @return {Object} { minutesToOpen, minutesToClose }
   */
  compute() {
    // default availability state
    const result = {
      minutesToOpen: null,
      minutesToClose: null,
      isOpen: false,
      isOpeningSoon: false,
      isClosingSoon: false,
      openState: this.state.NO_DATA
    };
    
    const openingHours = this.openingHours.length ? this.openingHours[0] : null;
    
    if (openingHours && openingHours.from && openingHours.to) {
      // create DateTime objects from yyyy-MM-ddTHH:MM string
      const dtOpening = DateTime.fromISO(
        `${openingHours.date}T${padTime(openingHours.from)}`,
        { zone: this.timeZone }
      );
      const dtClosing = DateTime.fromISO(
        `${openingHours.date}T${padTime(openingHours.to)}`,
        { zone: this.timeZone }
      );
      
      // default openState is CLOSED and can be overwritten by following tests
      result.openState = this.state.CLOSED;
      
      result.minutesToClose = dtClosing.diff(this.currentDate, 'minutes').minutes;
      result.minutesToOpen = dtOpening.diff(this.currentDate, 'minutes').minutes;
      
      // test for Opening Soon state
      if (dtOpening.isValid && dtClosing.isValid) { // test for Closing Soon state
        result.isOpeningSoon = result.minutesToOpen >= 0 &&
        result.minutesToOpen <= this.THRESHOLD;
        
        result.isOpen = result.minutesToOpen <= 0 &&
        result.minutesToClose > 0;
        
        result.isClosingSoon = result.minutesToClose >= 0 &&
        result.minutesToClose <= this.THRESHOLD;
        
        if (result.isClosingSoon) {
          result.openState = this.state.CLOSING_SOON;
        } else if (result.isOpen) {
          result.openState = this.state.OPEN;
        } else if (result.isOpeningSoon) {
          result.openState = this.state.OPENING_SOON;
        }
      }
    }
    
    this.availability = result;
    this.isComputed = true;
    
    return result;
  }
}

export default StoreAvailability;
