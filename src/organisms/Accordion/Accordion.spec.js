/* global describe, it */
import React from 'react';
import { mount } from 'enzyme';

import Accordion from './Accordion';


const wrapper = mount(
  <Accordion
    onChange={jest.fn()}
    active={1}
  >
    <div title="Title 1" key="1"><span>Panel 1</span></div>
    <div title="Title 2" key="2"><span>Panel 2</span></div>
  </Accordion>
);

describe('Accordion', () => {
  it('has displayName property set', () => {
    expect(Accordion.displayName).toBe('Accordion');
  });

  it('renders correct number of panels', () => {
    const panels = wrapper.find('.dc-accordion-panel');
    expect(panels.length).toBe(2);
  });

  it('all tabs are closed after clicking on active tab', () => {
    const activePanel = wrapper.find('.dc-accordion-panel-active');
    const activePanelBar = activePanel.find('.dc-accordion-bar');
    activePanelBar.simulate('click');
    const activePanels = wrapper.find('.dc-accordion-panel-active');
    expect(activePanels.length).toBe(0);
  });

  describe('Active panel', () => {
    it('is opened on click', () => {
      const firstPanel = () => wrapper.find('[data-id=0]');
      const firstPanelBar = () => firstPanel().find('.dc-accordion-bar');
      firstPanelBar().simulate('click');
      expect(firstPanel().hasClass('dc-accordion-panel-active')).toBe(true);
    });

    it('has correct active class', () => {
      const activePanel = wrapper.find('.dc-accordion-panel-active');
      expect(activePanel.prop('data-id')).toBe(0);
    });

    it('has correct title', () => {
      const activePanelTitle = wrapper.find('.dc-accordion-panel-active')
        .find('.dc-accordion-title');
      expect(activePanelTitle.text()).toBe('Title 1');
    });

    it('has correct content', () => {
      const activePanelContent = wrapper.find('.dc-accordion-panel-active')
        .find('.dc-accordion-content');
      expect(activePanelContent.text()).toBe('Panel 1');
    });
  });

});
