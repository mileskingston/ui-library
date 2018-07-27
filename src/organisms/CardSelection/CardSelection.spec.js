import React from 'react';
import { mount } from 'enzyme';

import CardSelection from './CardSelection';

const data = {
  cards: [
    {
      id: 'monthly-plan',
      title: 'Monthly Plan',
      features: [
        'Unlimited repairs due to faults or mishaps',
        "Fixed in 7 days or we'll replace with new",
        'Annual appliance check and deep clean'
      ],
      price: 4.5,
      priceInfo: 'a month',
      label: 'No minimum term'
    },
    {
      id: 'yearly-plan-3',
      title: '3-year Plan',
      features: [
        'Unlimited repairs due to faults or mishaps',
        'Annual appliance check and deep clean'
      ],
      price: 99,
      label: 'Save £63',
      subLabel: 'vs Monthly Plan'
    },
    {
      id: 'yearly-plan-5',
      title: '5-year Plan',
      features: [
        'Unlimited repairs due to faults or mishaps',
        "Fixed in 7 days or we'll replace with new",
        'Annual appliance check and deep clean'
      ],
      price: { amount: 129, currency: 'GBP' },
      label: 'Save £141',
      subLabel: 'vs Monthly Plan'
    }
  ],
  selectedCard: 'yearly-plan-5'
};

const onSelectCard = jest.fn();
const wrapper = mount(
  <CardSelection cards={data.cards} onSelectCard={onSelectCard} selectedCard={data.selectedCard} />
);

describe('CardSelection', () => {
  it('renders all cards', () => {
    expect(wrapper.find('.dc-card-selection__card').length).toBe(3);
  });

  it('card id is returned when clicking add', () => {
    wrapper
      .find('[data-component="CardSelection"] [data-component="Button"]')
      .first()
      .simulate('click');
    expect(onSelectCard.mock.calls[0][0]).toBe('monthly-plan');
  });

  it('blank card id is returned when clicking to remove', () => {
    wrapper
      .find('[data-component="CardSelection"] [data-component="Button"]')
      .last()
      .simulate('click');
    expect(onSelectCard.mock.calls[1][0]).toBe('');
  });
});
