import constants from '../config/constants';

export function isMSEdge() {
  return typeof window === 'undefined'
    ? false
    : window.navigator.userAgent.indexOf('Edge') > -1;
}

export function getMobileOS() {
  const os = {
    isIOS: false,
    isAndroid: false,
    isWindowsPhone: false
  };

  if (typeof window === 'undefined') {
    return os;
  }

  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) {
    os.isIOS = true;
  }
  if (userAgent.match(/Android/i)) {
    os.isAndroid = true;
  }
  if (userAgent.match(/IEMobile/i)) {
    os.isWindowsPhone = true;
  }

  return os;
}

export const mobileOS = getMobileOS();

/**
 * Detect device type by reading computed style that is set by media queries in CSS
 * It uses z-index for this purpose, but it can be any numeric property
 * @returns {string} one of wide | desktop | tablet | mobile
 */
export function getDeviceType() {
  const detectorClass = 'dc-device-detector';
  const deviceTypeMapping = {
    0: 'wide',
    1: 'desktop',
    2: 'tablet',
    3: 'mobile'
  };
  const defaultDeviceType = 1;
  let detectorElement;

  detectorElement = document.querySelector(`.${detectorClass}`);

  if (detectorElement === null) {
    detectorElement = document.createElement('div');
    detectorElement.className = detectorClass;
  }

  document.querySelector('body').appendChild(detectorElement);
  const detectedValue = window.getComputedStyle(detectorElement).getPropertyValue('z-index');

  return Number.isNaN(detectedValue)
    ? deviceTypeMapping[defaultDeviceType]
    : deviceTypeMapping[detectedValue];
}

/**
 * @link http://stackoverflow.com/a/4819886
 *
 * @returns {boolean}
 */
export function supportsTouch() {
  if (typeof window === 'undefined') {
    return false;
  }

  return !!('ontouchstart' in window) || !!('msmaxtouchpoints' in window.navigator);
}

export function browser() {
  const deviceType = getDeviceType();

  let stickyHeaderOffset = 0;

  if (deviceType === 'mobile') {
    stickyHeaderOffset = constants.MOBILE_TOOLBAR_HEIGHT;
  }

  if (deviceType === 'tablet') {
    stickyHeaderOffset = constants.TABLET_TOOLBAR_HEIGHT;
  }

  return {
    deviceType: deviceType,
    isWide: deviceType === 'wide',
    isDesktop: deviceType === 'desktop',
    isTablet: deviceType === 'tablet',
    isMobile: deviceType === 'mobile',
    isTouch: deviceType === 'tablet' || deviceType === 'mobile',
    stickyHeaderOffset: stickyHeaderOffset,
    supportsTouch: supportsTouch()
  };
}
