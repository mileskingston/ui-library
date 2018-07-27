/* eslint-disable no-restricted-properties, no-underscore-dangle */
import { isMSEdge, getMobileOS } from './browser';

describe('isMSEdge', () => {

  it('correctly detects MS Edge', () => {
    navigator.__defineGetter__('userAgent', () => 'MS Edge');
    expect(isMSEdge()).toBe(true);
  });

  it('does not return true for IE 8', () => {
    navigator.__defineGetter__('userAgent', () => 'IE 8');
    expect(isMSEdge()).toBe(false);
  });

});

describe('getMobileOS', () => {

  it('correctly detects iOS', () => {
    navigator.__defineGetter__('userAgent', () => 'iPhone 6S');
    expect(getMobileOS()).toEqual({
      isIOS: true,
      isAndroid: false,
      isWindowsPhone: false
    });
  });

  it('correctly detects Android', () => {
    navigator.__defineGetter__('userAgent', () => 'Chrome Android KitKat');
    expect(getMobileOS()).toEqual({
      isIOS: false,
      isAndroid: true,
      isWindowsPhone: false
    });
  });

  it('correctly detects Windows Phone', () => {
    navigator.__defineGetter__('userAgent', () => 'IEMobile');
    expect(getMobileOS()).toEqual({
      isIOS: false,
      isAndroid: false,
      isWindowsPhone: true
    });
  });

});
