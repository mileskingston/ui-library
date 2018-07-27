/* eslint-disable react/prop-types  */

import React from 'react';

export default props => (
  <a data-component="Link" {...props}>{props.children}</a>
);
