/* global describe, it */
import React from 'react';
import { mount } from 'enzyme';

import ClosableTag from './ClosableTag';
import Rating from '../../molecules/Rating/Rating';
import Icon from '../../molecules/Icon/Icon';

const onCloseClick1 = jest.fn();
const onCloseClick2 = jest.fn();

const closableTagWithTextContent = mount(
  <ClosableTag onCloseClick={onCloseClick1}>
    HOTPOINT
  </ClosableTag>
);

const closableTagWithRatingComponent = mount(
  <ClosableTag
    closeButtonTooltipText="Click to do some action"
    onCloseClick={onCloseClick2}
  >
    <Rating
      icon={<Icon icon="Star" />}
      maxCount={5}
      ratingCount={15}
      ratingValue={3.5}
    />
  </ClosableTag>
);

describe('ClosableTag component with text content', () => {

  it('is rendered correctly', () => {
    expect(closableTagWithTextContent.find('.dc-closable-tag').length).toBe(1);
    expect(closableTagWithTextContent.find('.dc-closable-tag__content').length).toBe(1);
    expect(closableTagWithTextContent.find('.dc-closable-tag .dc-close').length).toBe(1);
  });

  it('is called once when clicking on Close button', () => {
    const button =
      closableTagWithTextContent.find('span[data-component="Icon"][data-name="Cross"]');
    button.simulate('click');
    expect(onCloseClick1).toHaveBeenCalledTimes(1);
  });

  it("doesn't contain tooltip", () => {
    expect(closableTagWithTextContent
      .find('span.dc-close[data-component="Close"][title=""]').length).toBe(0);
  });
});

describe('ClosableTag component with Rating component as child', () => {

  it('is rendered correctly', () => {
    expect(closableTagWithRatingComponent.find('.dc-closable-tag').length).toBe(1);
    expect(closableTagWithRatingComponent
      .find('.dc-closable-tag__content div.dc-rating[data-component="Rating"]').length).toBe(1);
    expect(closableTagWithRatingComponent.find('.dc-closable-tag .dc-close').length).toBe(1);
  });

  it('is called once when clicking on Close button', () => {
    const button =
      closableTagWithRatingComponent.find('span[data-component="Icon"][data-name="Cross"]');
    button.simulate('click');
    expect(onCloseClick2).toHaveBeenCalledTimes(1);
  });

  it('contains tooltip', () => {
    expect(closableTagWithRatingComponent
      .find('span.dc-close[data-component="Close"][title="Click to do some action"]')
      .length).toBe(1);
  });
});
