/* global describe, it, before */
import React from 'react';
import { mount } from 'enzyme';
import Icon from '../../molecules/Icon/Icon';
import Alert from '../../molecules/Alert/Alert';
import AlertController from './AlertController';

const map = {};
document.addEventListener = jest.fn((event, cb) => {
  map[event] = cb;
});

const component = (
  <div className="test-wrapper">
    <span className="outer-element">I`m outside of the AlertContainer</span>

    <AlertController
      alert={<Alert>Hello World!</Alert>}
      align="right"
      isFloating
      showArrow
    >
      <Icon icon="Bell" />
    </AlertController>
  </div>
);

const wrapper1 = mount(component);
const wrapper2 = mount(component);
const wrapper3 = mount(component);

describe('AlertController', () => {
  it('renders component', () => {
    expect(wrapper1.find('.dc-alert-controller').length).toBe(1);
  });

  it('renders correct children', () => {
    expect(wrapper1.find('.dc-icon-bell').length).toBe(1);
  });

  it('renders with correct floating class', () => {
    expect(wrapper1.find('.dc-alert-controller--floating').length).toBe(1);
  });

  it('renders with correct align class', () => {
    expect(wrapper1.find('.dc-alert-controller--align-right').length).toBe(1);
  });

  it('opens alert after click on the children element', () => {
    expect(wrapper1.find('.dc-alert').length).toBe(0);
    wrapper1.find('.dc-alert-controller__trigger').simulate('click');

    expect(wrapper1.find('.dc-alert').length).toBe(1);
  });

  it('closes alert after clicking on the children element', () => {
    wrapper2.find('.dc-alert-controller__trigger').simulate('click');
    expect(wrapper2.find('.dc-alert').length).toBe(1);
    wrapper2.find('.dc-alert-controller__trigger').simulate('click');

    expect(wrapper2.find('.dc-alert').length).toBe(0);
  });

  it('closes alert after pressing ESC key', () => {
    wrapper3.find('.dc-alert-controller__trigger').simulate('click');
    expect(wrapper3.find('.dc-alert').length).toBe(1);

    map.keydown({ keyCode: 27 });
    wrapper3.update();

    expect(wrapper3.find('.dc-alert').length).toBe(0);
  });

});
