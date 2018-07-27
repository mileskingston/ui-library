/* global describe, it, before */
import React from 'react';
import { mount } from 'enzyme';
import Close from './Close';

const onClose1 = jest.fn();
const onClose2 = jest.fn();

const closeWithoutLabel = mount(
  <Close onClose={onClose1} />
);

const closeWithLabelOnRightAndTooltip = mount(
  <Close
    labelText="Close"
    labelPosition="right"
    onClose={onClose2}
    tooltipText="Click to Close"
  />
);

describe('Close button without label and tooltip', () => {
  it('Close method called when the span data-component=Close is clicked', () => {
    closeWithoutLabel.find('span[data-component="Icon"][data-name="Cross"]').simulate('click');
    expect(onClose1).toHaveBeenCalled();
  });

  it('There is no label', () => {
    expect(closeWithoutLabel.find('span.dc-close-label').exists()).toBe(false);
  });

  it("Tooltip doesn't exist", () => {
    expect(closeWithoutLabel.find('span.dc-close[data-component="Close"][title=""]')
      .exists()).toBe(false);
  });
});

describe('Close button with label on the right and tooltip', () => {
  it('Close method called twice when cross icon and then label is clicked', () => {
    closeWithLabelOnRightAndTooltip.find('span[data-component="Icon"][data-name="Cross"]')
      .simulate('click');
    closeWithLabelOnRightAndTooltip.find('span.dc-close-label').simulate('click');
    expect(onClose2).toHaveBeenCalledTimes(2);
  });

  it('Label on the right exists', () => {
    expect(closeWithLabelOnRightAndTooltip.find('span.dc-close[data-component="Close"]').childAt(1)
      .find('span.dc-close-label').exists()).toBe(true);
  });

  it('Tooltip exists', () => {
    expect(closeWithLabelOnRightAndTooltip
      .find('span.dc-close[data-component="Close"][title="Click to Close"]').exists()).toBe(true);
  });
});
