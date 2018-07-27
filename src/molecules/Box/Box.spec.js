/* global describe, it, before */
import React from 'react';
import { mount } from 'enzyme';
import Box from './Box';

const boxWrapper = mount(
  <Box>
    {[<div key="1" id="boxContent" />]}
  </Box>
);

describe('Box rendering', () => {
  it('Should render the children correctly', () => {
    expect(boxWrapper.find('#boxContent').length).toBe(1);
  });
});

