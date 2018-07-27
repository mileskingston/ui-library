import React from 'react';
import { mount } from 'enzyme';

import ClosableTooltip from './ClosableTooltip';

describe('ClosableTooltip', () => {

  const onClose = jest.fn();

  const wrapperContent = (
    <div>
      <ClosableTooltip
        type="warning"
        arrow="bottom"
        closeOnClickOutsideEnabled
        display
        onCloseButtonClick={onClose}
      >
        <h3>
          Test Closable Tooltip with bottom arrow, close
        </h3>
      </ClosableTooltip>
    </div>
  );

  const wrapper = mount(wrapperContent);

  it('renders component', () => {
    expect(wrapper.find('.dc-closable-tooltip').length).toBe(1);
  });
  it('renders Tooltip sub-component', () => {
    expect(wrapper.find('.dc-tooltip').length).toBe(1);
  });
  it('renders correctly Tooltip type (warning type)', () => {
    expect(wrapper.find('.dc-tooltip .dc-tooltip-warning').length).toBe(1);
  });
  it('renders Close button sub-component', () => {
    expect(wrapper.find('.dc-closable-tooltip-close-button').length).toBe(1);
  });
  it('renders content of tooltip', () => {
    expect(wrapper.find('.dc-closable-tooltip .dc-tooltip h3').text())
      .toBe('Test Closable Tooltip with bottom arrow, close');
  });
  it('component is closed if close button is clicked', () => {
    expect(wrapper.find('.dc-closable-tooltip').length).toBe(1);
    wrapper.find('.dc-closable-tooltip .dc-close .dc-close-label').simulate('click');
    expect(onClose).toHaveBeenCalled();
  });
});
