/* global describe, it, before */
import React from 'react';
import { mount } from 'enzyme';
import Carousel from './Carousel';

const wrapper = mount(
  <Carousel>
    <div className="slide">Slide 1</div>
    <div className="slide">Slide 2</div>
    <div className="slide">Slide 3</div>
  </Carousel>
);

describe('Carousel', () => {
  it('Renders the container', () => {
    expect(wrapper.find('.dc-carousel').length).toBe(1);
  });

  it('Renders correct number of slides', () => {
    expect(wrapper.find('.dc-carousel__item').length).toBe(3);
  });

  it('Renders correct number of navigational dots', () => {
    expect(wrapper.find('.dc-carousel__navigation__item').length).toBe(3);
  });

  it('Renders correct active dots after click', () => {
    const navigationalItems = () => wrapper.find('.dc-carousel__navigation__item');

    expect(navigationalItems().at(0).hasClass('dc-carousel__navigation__item--current')).toBe(true);
    navigationalItems().at(2).simulate('click');
    expect(navigationalItems().at(2).hasClass('dc-carousel__navigation__item--current')).toBe(true);
  });
});
