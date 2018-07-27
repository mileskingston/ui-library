import React from 'react';
import { mount } from 'enzyme';
import Card from './Card';

const cardWrapper = mount(
  <Card title="Card Title">
    {[<div key="1" id="cardContent" />]}
  </Card>
);

describe('Card', () => {
  it('renders the title', () => {
    expect(cardWrapper.find('.dc-card__title').text()).toBe('Card Title');
  });
  it('renders the children', () => {
    expect(cardWrapper.find('#cardContent').length).toBe(1);
  });
});
