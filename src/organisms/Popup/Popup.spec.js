/* global describe, it, afterEach, beforeEach */
import React from 'react';
import { mount } from 'enzyme';
import Popup from './Popup';

const onCloseSpy = jest.fn();

function onCloseToWrap() {
  onCloseSpy();
}

function wrapCallbackWithPromise(callback) {
  const fakePromise = {
    listeners: [],
    then(cb) {
      this.listeners.push(cb);
      return this;
    }
  };

  function wrappedCallback() {
    callback();
    fakePromise.listeners.forEach((listener) => {
      listener();
    });
  }

  return {
    promise: fakePromise,
    wrappedCallback
  };
}

// eslint-disable-next-line max-len
const { wrappedCallback: onClose, promise: promiseOnClose } = wrapCallbackWithPromise(onCloseToWrap);

const children = <div className="test">test</div>;
const title = 'title testing';
const optionalClasses = 'opt-class-test';

const setup = {
  children,
  title,
  onClose,
  hideHeaderBar: false,
  optionalClasses
};

let wrapper = null;

describe('Popup ', () => {
  afterEach(() => {
    wrapper.unmount();
  });
  beforeEach(() => {
    wrapper = mount(
      <Popup {...setup} >
        {children}
      </Popup>
    );
  });
  it('renders the container', () => {
    expect(wrapper.find('.dc-popup-overlay').length).toBeGreaterThanOrEqual(1);
  });
  it('renders the children', () => {
    expect(wrapper.find('.test').length).toBeGreaterThanOrEqual(1);
  });
  it('renders the header', () => {
    expect(wrapper.find('.dc-popup-header').length).toBeGreaterThanOrEqual(1);
  });
  it('renders optional classes to wrapper', () => {
    expect(wrapper.find('.dc-popup-overlay').hasClass('opt-class-test')).toBe(true);
  });
  it('doesnt render the header if hideHeaderBar is true', () => {
    const alternativeSetup = Object.assign({}, setup, { hideHeaderBar: true });
    wrapper.unmount();
    wrapper = mount(
      <Popup {...alternativeSetup}>
        {children}
      </Popup>
    );
    expect(wrapper.find('.dc-popup-header').length).toBe(0);
  });
  describe('onClose tests, ', () => {
    afterEach(() => { onCloseSpy.mockClear(); });
    it('closes, when the cont is clicked', () => {
      wrapper.find('.dc-popup-overlay').simulate('click');
      expect(onCloseSpy).toHaveBeenCalled();
    });
    it('closes, when the escape key is pressed', (done) => {
      const keyboardEvent = document.createEvent('KeyboardEvent');
      keyboardEvent.initKeyboardEvent(
        'keydown', // event type : keydown, keyup, keypress
        true, // bubbles
        true, // cancelable
        window, // viewArg: should be window
        false, // ctrlKeyArg
        false, // altKeyArg
        false, // shiftKeyArg
        false, // metaKeyArg
        27, // keyCodeArg : unsigned long the virtual key code, else 0
        0 // charCodeArgs : unsigned long the Unicode character associated with the depressed key, else 0
      );

      Object.defineProperty(keyboardEvent, 'keyCode', {
        get() {
          return this.keyCodeVal;
        }
      });

      keyboardEvent.keyCodeVal = 27;

      promiseOnClose.then(() => {
        expect(onCloseSpy).toHaveBeenCalled();
        done();
      });

      document.dispatchEvent(keyboardEvent);
    });
  });
});
