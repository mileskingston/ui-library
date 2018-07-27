export {
  capitalize,
  camelToDash,
  truncateText,
  stripTags
} from './stringHelpers';
export { getCookie, setCookie } from './cookies';
export * as dateHelpers from './dateHelpers';
export { get, post, postJSON, urlWithParams } from './network';
export {
  isMSEdge,
  getMobileOS,
  mobileOS,
  getDeviceType,
  supportsTouch,
  browser
} from './browser';
export {
  verifyGoogleMapsApiSetup,
  autocompleteLocations,
  getPlaceDetailsByAddress,
  getPlaceDetails,
  getPlaceDetailsByLocation,
  extractAddressComponent
} from './location';
export {
  saveToSessionStorage,
  getFromSessionStorage,
  removeFromSessionStorage
} from './sessionStorage';
export {
  parseRegExp
} from './regExpHelpers';
export contentLength from './contentLength';
export debounce from './debounce';
export getPostalSector from './getPostalSector';
export normalizePostCode from './normalizePostCode';
export staticTimeoutResolver from './staticTimeoutResolver';
export urlManipulation from './urlManipulation';
export formatPrice from './formatPrice';
export toggleOverflow from './toggleOverflow';
export scrollToElement from './scrollToElement';
export StoreAvailability from './storeAvailability';
export padLeft from './padLeft';
