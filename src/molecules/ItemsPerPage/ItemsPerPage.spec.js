import React from 'react';
import { mount } from 'enzyme';

import ItemsPerPage from './ItemsPerPage';

describe('ItemsPerPage', () => {

  it('should not display when count of items is lower than or equal to options[0]', () => {
    const wrapper = mount(<ItemsPerPage
      itemsCount={20}
      options={[20, 30, 50]}
      activeOption={20}
    />);

    expect(wrapper.html()).toBe('<noscript></noscript>');
  });

  it('should display correct options including "All"', () => {
    const wrapper = mount(<ItemsPerPage
      itemsCount={50}
      options={[20, 30, 50]}
      activeOption={20}
    />);

    expect(wrapper.find('div').childAt(0).text()).toBe(' 20');

    expect(wrapper.find('div').childAt(1).childAt(0).type()).toBe('span');
    expect(wrapper.find('div').childAt(1).childAt(0).text()).toBe(' | ');
    expect(wrapper.find('div').childAt(1).childAt(1).type()).toBe('a');
    expect(wrapper.find('div').childAt(1).childAt(1).text()).toBe('30');

    expect(wrapper.find('div').childAt(2).childAt(0).type()).toBe('span');
    expect(wrapper.find('div').childAt(2).childAt(0).text()).toBe(' | ');
    expect(wrapper.find('div').childAt(2).childAt(1).type()).toBe('a');
    expect(wrapper.find('div').childAt(2).childAt(1).text()).toBe('All');
  });

  it('should display correct options excluding "All"', () => {
    const wrapper = mount(<ItemsPerPage
      itemsCount={110}
      options={[20, 30, 40, 50, 100]}
      activeOption={30}
    />);

    expect(wrapper.find('div').childAt(0).childAt(0).type()).toBe('a');
    expect(wrapper.find('div').childAt(0).childAt(0).text()).toBe('20');

    expect(wrapper.find('div').childAt(1).text()).toBe(' | 30');

    expect(wrapper.find('div').childAt(2).childAt(0).type()).toBe('span');
    expect(wrapper.find('div').childAt(2).childAt(0).text()).toBe(' | ');
    expect(wrapper.find('div').childAt(2).childAt(1).type()).toBe('a');
    expect(wrapper.find('div').childAt(2).childAt(1).text()).toBe('40');

    expect(wrapper.find('div').childAt(3).childAt(0).type()).toBe('span');
    expect(wrapper.find('div').childAt(3).childAt(0).text()).toBe(' | ');
    expect(wrapper.find('div').childAt(3).childAt(1).type()).toBe('a');
    expect(wrapper.find('div').childAt(3).childAt(1).text()).toBe('50');

    expect(wrapper.find('div').childAt(4).childAt(0).type()).toBe('span');
    expect(wrapper.find('div').childAt(4).childAt(0).text()).toBe(' | ');
    expect(wrapper.find('div').childAt(4).childAt(1).type()).toBe('a');
    expect(wrapper.find('div').childAt(4).childAt(1).text()).toBe('100');
  });

  it('should call onOptionSelected with correct value', () => {
    const onClickSpy = jest.fn();

    const wrapper = mount(<ItemsPerPage
      itemsCount={45}
      options={[20, 30, 50]}
      activeOption={20}
      onOptionSelected={onClickSpy}
    />);

    wrapper.find('div').childAt(1).childAt(1).simulate('click');
    wrapper.find('div').childAt(2).childAt(1).simulate('click');

    expect(onClickSpy.mock.calls.length).toBe(2);
    expect(onClickSpy.mock.calls[0][0]).toBe(30);
    expect(onClickSpy.mock.calls[1][0]).toBe(45);
  });

});
