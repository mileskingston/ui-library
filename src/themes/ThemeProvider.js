/* eslint-disable react/prop-types */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import themeVariables from './variables';
import breakpointVariables from '../style/constants/breakpoints';
import * as spacing from '../atoms/spacing/variables';

const theme = { ...spacing };

Object.keys(themeVariables).forEach((variable) => {
  theme[variable] = themeVariables[variable].css;
});

Object.keys(breakpointVariables).forEach((variable) => {
  theme[variable] = breakpointVariables[variable].css;
});

export default props => (
  <ThemeProvider theme={theme}>
    {props.children}
  </ThemeProvider>
);
