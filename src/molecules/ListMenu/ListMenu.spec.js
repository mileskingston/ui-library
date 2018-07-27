import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';

import ThemeProvider from '../../themes/ThemeProvider';
import ListMenu from './ListMenu';

const wrap = content => mount(
  <ThemeProvider>{content}</ThemeProvider>
);

describe('ListMenu', () => {
  it('renders correctly', () => {
    const wrapper = wrap(
      <ListMenu
        style={{ width: 120, margin: 10 }}
        items={[
          {
            icon: 'EnvelopeOpen',
            label: 'Mark as read',
            interaction: 'Alerts list: Mark as read'
          },
          {
            icon: 'Bin',
            label: 'Delete'
          }
        ]}
      />
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
