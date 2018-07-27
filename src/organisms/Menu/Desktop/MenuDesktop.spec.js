import React from 'react';
import { shallow } from 'enzyme';
import Menu from './MenuDesktop';
import navAPIResponse from '../mocks/tree.json';

const setup = (props) => {
  
  const wrapper = shallow(<Menu {...props} homeLink="Home" homeURL="https://localhost/home" />);
  return {
    props,
    wrapper
  };
};

/**
 * Number of millisecond before
 * the sub menu appears.
 * @type {number}
 */
const SHOW_SUBMENU_DELAY = 5;

let wrapper = null;

describe('MenuDesktop', () => {
  beforeAll(() => {
    const result = setup({
      tree: navAPIResponse.payload,
      showSubMenuDelay: SHOW_SUBMENU_DELAY
    });
    wrapper = result.wrapper;
  });

  it('has displayName property set', () => {
    expect(Menu.displayName).toBe('MenuDesktop');
  });

  it('has no class for visible submenu by default', () => {
    expect(
      wrapper
        .find({ 'data-component': 'Menu' })
        .hasClass('subMenuActive')
    ).toBe(false);
  });

  it('has class for visible submenu set with delay', (done) => {
    const itemEl = wrapper.find({ 'data-element': 'Item' }).at(1);
    itemEl.simulate('mouseover');

    setTimeout(() => {
      wrapper.update();
      expect(
        wrapper
          .find({ 'data-component': 'Menu' })
          .hasClass('subMenuActive')
      ).toBe(true);
      done();
    }, SHOW_SUBMENU_DELAY);
  });

});
