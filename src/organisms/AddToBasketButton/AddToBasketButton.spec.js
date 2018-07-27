import React from 'react';
import { mount } from 'enzyme';
import AddToBasketButton from './AddToBasketButton';

describe('AddToBasketButton, ', () => {
  it('renders properly', () => {
    const buttonMounted = mount(
      <AddToBasketButton productId="1" postUrl="/post">
        <span>Add to basket</span>
      </AddToBasketButton>
    );
    expect(buttonMounted.find('form').length).toBe(1);
  });
});
